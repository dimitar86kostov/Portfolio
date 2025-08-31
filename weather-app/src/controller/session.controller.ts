import { Request, Response } from "express";
import config from "config";
import {
    createSession,
    findSessions,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

// export async function createUserSessionHandler(req: Request, res: Response) {
//     // Validate the user's password
//     const user = await validatePassword(req.body);

    
//     if (!user) {
//         return res.status(401).send("Invalid email or password");
//     }
    
//     // create a session
//     const session = await createSession(user._id.toString(), req.get("user-agent") || "");
//     console.log("JWT payload:", { ...user, session: session._id });

//     // create an access token
//     const accessToken = signJwt(
//         { ...user, session: session._id },
//         { expiresIn: config.get("accessTokenTtl") } // 15 minutes
//     )

//     // create a refresh token
//     const refreshToken = signJwt(
//         { ...user, session: session._id },
//         { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
//     )

//     // send the tokens in the response

//     return res.send({
//         accessToken,
//         refreshToken,
//     })
// }

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = await createSession(user._id.toString(), req.get("user-agent") || "");

    // Convert user to plain object and stringify ObjectId fields
    const userPayload = {
        ...user,
        _id: user._id.toString(),
        session: session._id.toString(),
        createdAt: user.createdAt?.toString(),
        updatedAt: user.updatedAt?.toString(),
    };

    console.log("JWT payload:", userPayload);

    // create an access token
    const accessToken = signJwt(
        userPayload,
        { expiresIn: config.get("accessTokenTtl") }
    );

    // create a refresh token
    const refreshToken = signJwt(
        userPayload,
        { expiresIn: config.get("refreshTokenTtl") }
    );

    return res.send({
        accessToken,
        refreshToken,
    });
}

export async function getUserSessionsHandler(req: Request, res: Response) {

    const userId = res.locals.user._id;
    

    const sessions = await findSessions({ user: userId, valid: true });
    console.log({ sessions });

    return res.send(sessions);
}