import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import { validateEmail, validateName, validatePassword } from './utils';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/user.dto';
import bcrypt from "bcrypt"

@Command({
    name: 'create-admin',
    description: 'Create an admin user',
    options: { isDefault: true },
})
export class CreateAdminCommand extends CommandRunner {
    constructor(
        private readonly inquirerService: InquirerService,
        private readonly userService: UserService
    ) {
        super();
    }

    private password: string;

    async run(_inputs: string[], options?: Record<string, any>) {
        if (!options || !Object.keys(options).length)
            options = await this.inquirerService.ask('create-admin-questions', {});

        if (options.password !== options.confirmPassword) throw new Error("Passwords do not match");

        const newUser: CreateUserDto = {
            email: options.email,
            name: options.name,
            passwordHash: bcrypt.hashSync(options.password, 10),
            isActive: true,
            isBootstrapAdmin: true,
        }

        await this.userService.createUser(newUser)
        console.log("Admin user created successfully", options);
    }

    // The the second argument in the flags will be the name of the key in the options object --name -> <name> is the key. 
    @Option({
        flags: '-n, --name [name]',
        description: 'The Name of the admin user',
    })
    parseName(val: string): string {
        return validateName(val);
    }

    @Option({
        flags: '-e, --email [email]',
        description: 'The Email of the admin user',
    })
    parseEmail(val: string): string {
        return validateEmail(val);
    }

    @Option({
        flags: '-p, --password [password]',
        name: "password",
        description: 'The Password of the admin user',
    })
    parsePassword(val: string): string {
        this.password = validatePassword(val);
        return this.password;
    }

    @Option({
        flags: "-c, --confirm-password [confirmPassword]",
        description: "Confirm the password",
    })
    parseConfirmPassword(val: string) {
        if (val !== this.password) {

            console.log(val);
            throw new Error("Passwords do not match");
        }

        return val;
    }
}