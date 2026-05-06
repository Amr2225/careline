import { Command, CommandRunner } from 'nest-commander';
import { DbService } from '@/db/db.service';

@Command({
    name: 'assign-manager-role',
    description: 'Assign the manager role to a user',
})
export class AssignManagerRoleCommand extends CommandRunner {
    constructor(
        private readonly dbService: DbService
    ) {
        super();
    }


    async run() {
        const adminUser = await this.dbService.user.findMany({
            where: {
                isBootstrapAdmin: true,
            }
        })

        const managerRole = await this.dbService.role.findFirst({
            where: {
                name: {
                    contains: "manager",
                    mode: "insensitive",
                }
            }
        })

        if (!managerRole) throw new Error("Manager role not found");

        adminUser.forEach(async (user) => {
            await this.dbService.userRole.upsert({
                where: {
                    userId_roleId: {
                        userId: user.id,
                        roleId: managerRole.id,
                    }
                },
                update: {
                    userId: user.id,
                    roleId: managerRole.id,
                    assignedAt: new Date(),
                },
                create: {
                    userId: user.id,
                    roleId: managerRole.id,
                }
            })
        })

        console.log("Manager role assigned to admins successfully");
    }
}