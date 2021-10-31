export class UserLoginInput {
    email: string;
    password: string;
}

export class UserRegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class RegistrationConfirmInput {
    email: string;
    code: string;
}
