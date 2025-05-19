import {hashPassword} from "./bcrypt";

export function hashPassword(password: hashPassword): string;

export function comparePasswords(plain: string, hash: string): boolean;