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
            action: ["READ", "WRITE", "UPDATE", "DELETE"],
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

async function main() {
    const modulesData = await prisma.module.createMany({
        skipDuplicates: true,
        data: modules
    })


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

    const selectModules = await prisma.module.findMany();
    const selectRoles = await prisma.role.findMany();

    console.log("\nSeed completed successfully");
    console.log("=".repeat(32));

    console.table([
        { Resource: "Modules", Created: modulesData.count, Total: selectModules.length },
        { Resource: "Roles", Created: roles.length, Total: selectRoles.length },
    ]);

    console.log("\nSeeded modules");
    console.table(
        selectModules.map(({ name, description }) => ({
            Name: name,
            Description: description,
        })),
    );

    console.log("\nSeeded roles");
    console.table(
        selectRoles.map(({ name, description, isSystem }) => ({
            Name: name,
            Description: description,
            System: isSystem ? "Yes" : "No",
        })),
    );
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