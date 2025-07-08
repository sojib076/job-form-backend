export type Iuser = {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    isBlocked: boolean;
}