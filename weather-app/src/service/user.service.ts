// import UserModel, { UserDocument } from '../models/user.model';
// import { DocumentDefinition } from 'mongoose';

// export async function createUser(
//     input: DocumentDefinition<
//         Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
//     >
// ) {
//     try {
//         return await UserModel.create(input);
//     } catch (e: any) {
//         throw new Error(e);
//     }
// }

import UserModel from '../models/user.model';
import { CreateUserInput } from '../schema/user.schema';

export async function createUser(input: CreateUserInput) {
    // Remove passwordConfirmation before saving
    const { passwordConfirmation, ...userData } = input;
    try {
        return await UserModel.create(userData);
    } catch (e: any) {
        throw new Error(e);
    }
}