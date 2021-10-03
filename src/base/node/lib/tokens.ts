import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/base/node/lib/constants';

export function createAuthToken(id: string) {
	return jwt.sign({ id }, JWT_SECRET_KEY);
}

export function getAuthUserId(req: express.Request): string | null {
	const token = (req.headers.authorization ?? '').split(' ')[1];
	const data = !token ? null : jwt.decode(token);
	return typeof data === 'string' || data === null ? null : data.id;
}
