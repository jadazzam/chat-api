export interface UserGetType {
    id: string;
    name: string;
    email: string;
    created_at: Date
    password?: string
}

export interface UserPostType {
    name: string;
    email: string;
    password: string;
}

export interface UserRequestType {
    id: string;
    name: string;
    email: string;
}