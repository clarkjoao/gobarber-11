import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppErros from '../errors/AppErros';
import jwtConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { authorization } = request.headers;
    if (!authorization) {
        throw new AppErros('Token not exists', 401);
    }

    const [, token] = authorization.split(' ');
    try {
        const decoded = verify(token, jwtConfig.jwt.secret);
        const { sub } = decoded as TokenPayload;
        request.user = { id: sub };
        return next();
    } catch {
        throw new AppErros('Token is invalid', 401);
    }
}
