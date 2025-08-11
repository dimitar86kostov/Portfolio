import UserModel, { UserDocument } from '../models/user.model';
import { CreateUserInput } from '../schema/user.schema';
import { omit } from "lodash";

export async function createUser(input: CreateUserInput) {
    const { passwordConfirmation, ...userData } = input;

    try {
        const user = await UserModel.create(userData);
        return omit(user.toJSON(), 'password');
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({
    email,
    password
}: {
    email: string;
    password: string;
}): Promise<Omit<UserDocument, 'password'>> {
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    return omit(user.toJSON(), 'password') as Omit<UserDocument, 'password'>;
}
