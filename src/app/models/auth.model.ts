import { Roles } from "@app/enums/roles.enum";

type fullName = {
    firstName: string,
    middleName?: string,
    lastName: string,
}

export interface User {
    id: string,
    name: fullName,
    email?: string,
    phone: string | number,
    role: Roles
}