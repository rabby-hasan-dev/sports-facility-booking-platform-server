

export type TUser = {
    name: string;
    email: string;
    passsword: string;
    phone: string;
    role: 'admin' | 'user';
    address: string;
}