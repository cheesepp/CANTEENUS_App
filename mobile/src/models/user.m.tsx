export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    avatar: string;
    phone: string;
}

export class UserModel implements User {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    avatar: string;
    phone: string;

    constructor(id: string, email: string, name: string, role: string, password: string, avatar: string, phone: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.password = password;
        this.avatar = avatar;
        this.phone = phone;
    }
}