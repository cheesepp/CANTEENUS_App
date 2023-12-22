export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    avatar: string;
    phone: string;
    jwt: string,
}

export class UserModel implements User {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    avatar: string;
    phone: string;
    jwt: string;

    constructor(id: string, email: string, name: string, role: string, password: string, avatar: string, phone: string, jwt: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.password = password;
        this.avatar = avatar;
        this.phone = phone;
        this.jwt = jwt;
    }
}