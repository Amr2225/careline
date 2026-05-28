import { Action, PrismaClient } from '@careline/shared/prisma/client';
import { Pool } from "pg"
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const modules = [
    {
        name: "Users",
        description: "Manage staff and patient user accounts"
    },
    {
        name: "Roles",
        description: "Create and edit roles and permission matrices"
    },
    {
        name: "Patients",
        description: "Patient profile and medical contact info"
    },
    {
        name: "Appointments",
        description: "Available slot creation, browsing, booking, cancellation"
    },
    {
        name: "Queue",
        description: "QR walk-in checkin, live queue, call/skip/done, priority"
    },
    {
        name: "Finance",
        description: "Revenue tracking and per-visit billing"
    },
    {
        name: "Stats",
        description: "Daily metrics: avg wait, patients seen, no-shows"
    },
    {
        name: "Settings",
        description: "Walk-in cap, late-arrival thresholds, clinic info"
    }
]

const roles = [
    {
        name: "Manager",
        description: "Senior Manager",
        permissions: modules.map(module => ({
            module: module.name,
            action: module.name === "Patients"
                ? ["READ", "WRITE", "UPDATE", "DELETE", "UPDATE_MEDICAL"]
                : ["READ", "WRITE", "UPDATE", "DELETE"],
        }))
    },
    {
        name: "Receptionist",
        description: "Receptionist",
        permissions: [
            {
                module: "Patients",
                action: ["READ", "WRITE", "UPDATE", "DELETE"],
            },
            {
                module: "Appointments",
                action: ["READ", "WRITE", "UPDATE", "DELETE"],
            },
            {
                module: "Queue",
                action: ["READ", "WRITE", "UPDATE", "DELETE"],
            },
            {
                module: "Stats",
                action: ["READ"],
            }
        ]
    },
    {
        name: "Doctor",
        description: "Doctor",
        modules: ["Queue", "Appointments", "Patients"],
        permissions: [
            {
                module: "Queue",
                action: ["READ"],
            },
            {
                module: "Appointments",
                action: ["READ"],
            },
            {
                module: "Patients",
                action: ["READ", "UPDATE", "UPDATE_MEDICAL"],
            }
        ]
    },
    {
        name: "Scheduler",
        description: "Scheduler",
        permissions: [
            {
                module: "Appointments",
                action: ["READ", "WRITE", "UPDATE", "DELETE"],
            },
            {
                module: "Patients",
                action: ["READ"],
            },
            {
                module: "Queue",
                action: ["READ"],
            }
        ]
    },
    {
        name: "Patient",
        description: "Patient",
        permissions: [
            {
                module: "Appointments",
                action: ["READ", "WRITE", "UPDATE", "DELETE"],
            },
            {
                module: "Queue",
                action: ["WRITE"],
            }
        ]
    }
]

const settings = [
    {
        key: "appointmentDurationMinutes",
        value: "30"
    },
    {
        key: "slotCapacity",
        value: "1"
    },
    {
        key: "clinicHours",
        value: JSON.stringify({
            0: { "open": "09:00", "close": "17:00" },
            1: { "open": "09:00", "close": "17:00" },
            2: { "open": "09:00", "close": "17:00" },
            3: { "open": "09:00", "close": "17:00" },
            4: { "open": "09:00", "close": "17:00" },
            5: null,
            6: null
        })
    }
]

async function main() {
    let rolesExists = false;
    const modulesData = await prisma.module.createMany({
        skipDuplicates: true,
        data: modules
    })


    try {
        for (let role of roles) {
            await prisma.role.create({
                data: {
                    name: role.name,
                    description: role.description,
                    isSystem: true,
                    permissions: {
                        create: role.permissions.map((permission) => permission.action.map((action) => ({
                            action: action as Action,
                            module: {
                                connect: {
                                    name: permission.module
                                }
                            }
                        }))
                        ).flat()
                    }
                }
            })
        }
    } catch (error) {
        rolesExists = true;
    }

    const settingsData = await prisma.setting.createMany({
        skipDuplicates: true,
        data: settings
    })

    const selectModules = await prisma.module.findMany();
    const selectRoles = await prisma.role.findMany();
    const selectedSettings = await prisma.setting.findMany()

    console.log("\nSeed completed successfully");
    console.log("=".repeat(32));

    console.table([
        { Resource: "Modules", Created: modulesData.count, Total: selectModules.length },
        { Resource: "Roles", Created: roles.length, Total: selectRoles.length },
        { Resource: "Settings", Created: settingsData.count, Total: selectedSettings.length },
    ]);

    console.log("\nSeeded modules");
    console.table(
        selectModules.map(({ name, description }) => ({
            Name: name,
            Description: description,
        })),
    );

    if (!rolesExists) {
        console.log("\nSeeded roles");
        console.table(
            selectRoles.map(({ name, description, isSystem }) => ({
                Name: name,
                Description: description,
                System: isSystem ? "Yes" : "No",
            })),
        );
    } else {
        console.log("\nRoles already exist");
    }

    console.log("\nSeeded settings");
    console.table(
        selectedSettings.map(({ key, value }) => ({
            Name: key,
            value,
        }))
    )
}

main().then(async () => {
    await prisma.$disconnect();
    await pool.end();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
});