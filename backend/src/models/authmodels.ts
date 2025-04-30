import { genSaltSync, hashSync } from "bcrypt-ts";


interface UserCredentials {
    email: string,
    password: string,
    name?: string
}


class BaseForm {
    hash_password(password: string): string{
        const salt = genSaltSync(10)
        const hash = hashSync(password, salt)
        return hash
    };
    static validate_email(email: string): boolean {
        return email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) !== null
    }
}


export class LoginUser extends BaseForm {
    public email: string
    private hashed_password: string

    public static validate_credentials(credentials: UserCredentials): {isValid: boolean, errors: string[]} {
        const errors = []
        if (!('email' in credentials) || !('password' in credentials)) {
            errors.push('Missing fields')
        }
        if (!this.validate_email(credentials.email)) {
            errors.push('Email is not valid');
        }
        if (!(credentials.password.length >= 10)) {
            errors.push("Password length too low")
        }
        return {
            isValid: errors.length === 0,
            errors: errors
        }
    }

    constructor (credentials: UserCredentials) {
        super()
        if (!LoginUser.validate_credentials(credentials)) {
            throw new Error('Validation failed')
        }
        this.email = credentials.email
        this.hashed_password = this.hash_password(credentials.password)
    }

    public static createFromForm(formData: any): LoginUser | {errors: string[]} {
        const credentials: UserCredentials = {
            email: formData.email,
            password: formData.password
        };

        const validation = LoginUser.validate_credentials(credentials)
        if (!validation.isValid) {
            return {errors: validation.errors}
        }

        return new LoginUser(credentials)
    }
}


export class SignUpUser extends BaseForm {
    public email: string
    public name: string | undefined
    private hashed_password: string

    public static validate_credentials(credentials: UserCredentials): {isValid: boolean, errors: string[]} {
        const errors = []
        console.log(credentials)
        if (!('email' in credentials) || !('password' in credentials) || !(credentials.name !== undefined)) {
            errors.push('Missing fields')
        }
        if (!this.validate_email(credentials.email)) {
            errors.push('Email is not valid');
        }
        if (!(credentials.password.length >= 10)) {
            errors.push("Password length too low")
        }
        return {
            isValid: errors.length === 0,
            errors: errors
        }
    }

    constructor (credentials: UserCredentials) {
        super()
        if (!SignUpUser.validate_credentials(credentials)) {
            throw new Error('Validation failed')
        }
        this.email = credentials.email
        this.name = credentials.name
        this.hashed_password = this.hash_password(credentials.password)
    }

    public static createFromForm(formData: any): SignUpUser | {errors: string[]} {
        const credentials: UserCredentials = {
            email: formData.email,
            password: formData.password,
            name: formData.name
        };

        const validation = SignUpUser.validate_credentials(credentials)
        if (!validation.isValid) {
            return {errors: validation.errors}
        }

        return new SignUpUser(credentials)
    }
}


