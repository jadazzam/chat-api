import bcrypt from 'bcrypt';

export function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export async function comparePasswords(plain, hash) {
    return await bcrypt.compare(plain, hash);
}