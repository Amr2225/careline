# Example of a Mock RBAC service test

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Action } from '@careline/shared/prisma/enums';
import { DbService } from '@/db/db.service';
import { RbacService } from './rbac.service';

describe('RbacService', () => {
  let service: RbacService;

  const dbServiceMock = {
    userRole: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RbacService,
        {
          provide: DbService,
          useValue: dbServiceMock,
        },
      ],
    }).compile();

    service = module.get<RbacService>(RbacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load permissions for a user', async () => {
    dbServiceMock.userRole.findMany.mockResolvedValue([
      {
        role: {
          permissions: [
            {
              action: Action.READ,
              module: { name: 'patients' },
            },
          ],
        },
      },
    ]);

    await service.getPremissionsForUser('user-1');

    expect(dbServiceMock.userRole.findMany).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                module: true,
              },
            },
          },
        },
      },
    });

    expect((service as any).rolesSet.has('patients:read')).toBe(true);
  });

  it('should return true when user has permission', async () => {
    dbServiceMock.userRole.findFirst.mockResolvedValue({ id: 'user-role-1' });

    await expect(
      service.hasPermission('user-1', 'patients', Action.READ),
    ).resolves.toBe(true);
  });

  it('should return false when user does not have permission', async () => {
    dbServiceMock.userRole.findFirst.mockResolvedValue(null);

    await expect(
      service.hasPermission('user-1', 'patients', Action.WRITE),
    ).resolves.toBe(false);
  });
});
```
