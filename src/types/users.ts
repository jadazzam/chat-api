export interface UserGetType {
    id: string;
    name: string;
    email: string;
}

export interface UserPostType {
    name: string;
    email: string;
    password: string;
}