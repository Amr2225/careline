import { Test, TestingModule } from '@nestjs/testing';
import { Action } from '@careline/shared/prisma/enums';
import { DbService } from '@/db/db.service';
import { RbacService } from './rbac.service';
import { User } from '@careline/shared/prisma/client';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config/env.validate';

describe('RbacService', () => {
    let rbacService: RbacService;
    let dbService: DbService;
    let firstAdminUser: User;

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
                validate,
            })],
            providers: [
                RbacService,
                DbService,
            ],
        }).compile();

        rbacService = module.get<RbacService>(RbacService);
        dbService = module.get<DbService>(DbService);
    });

    afterEach(async () => {
        await dbService.$disconnect();
    });

    it('RBAC Service should be defined', () => {
        expect(rbacService).toBeDefined();
    });

    it('DB Service should be defined', () => {
        expect(dbService).toBeDefined();
    });

    it('should find first admin user', async () => {
        firstAdminUser = await dbService.user.findFirst({
            where: {
                isBootstrapAdmin: true
            }
        }) as User;

        expect(firstAdminUser).toBeDefined();
    })

    it('should load Manager permissions for bootstrap admin user', async () => {
        const roles = await rbacService.getPremissionsForUser(firstAdminUser.id);

        expect(roles.size).toEqual(32);
        expect(roles.has('Patients:read')).toBeTruthy();
        expect(roles.has('Patients:write')).toBeTruthy();
        expect(roles.has('Patients:update')).toBeTruthy();
        expect(roles.has('Patients:delete')).toBeTruthy();
    });

    it('should return true when user has permission', async () => {
        await expect(
            rbacService.hasPermission(firstAdminUser.id, 'Users', Action.WRITE),
        ).resolves.toBeTruthy();
    });

    it('should return false when user does not have permission', async () => {

        await expect(
            rbacService.hasPermission(firstAdminUser.id, 'Reports', Action.WRITE),
        ).resolves.toBeFalsy();
    });
});