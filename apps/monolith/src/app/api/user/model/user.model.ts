import { UserRole } from './user-role.model';

export default class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    website?: string;
    about?: string;
    country?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    role?: UserRole;
}
