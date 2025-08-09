import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string().nonempty('Name is required'),
        password: string()
            .min(6, 'Password must be at least 6 characters long')
            .nonempty('Password is required'),
        passwordConfirmation: string().nonempty('Password confirmation is required'),
        email: string().email('Invalid email format').nonempty('Email is required'),
    }).refine((data) => data.password === data.passwordConfirmation, { 
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];