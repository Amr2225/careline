import { Question, QuestionSet } from 'nest-commander';
import { validateEmail, validateName, validatePassword } from './utils';

@QuestionSet({ name: 'create-admin-questions' })
export class CreateAdminQuestions {
    private password: string;

    @Question({
        message: 'Enter your name: ',
        name: 'name',
    })
    parseName(val: string): string {
        return validateName(val);
    }

    @Question({
        message: 'Enter your Email: ',
        name: 'email',
    })
    parseEmail(val: string): string {
        return validateEmail(val);
    }

    @Question({
        message: 'Enter your password: ',
        name: 'password',
    })
    parsePassword(val: string): string {
        this.password = validatePassword(val);
        return this.password;
    }

    @Question({
        message: 'Confirm your password: ',
        name: 'confirmPassword',
    })
    parseConfirmPassword(val: string): string {
        if (val !== this.password)
            throw new Error("Passwords do not match");

        return val;
    }
}