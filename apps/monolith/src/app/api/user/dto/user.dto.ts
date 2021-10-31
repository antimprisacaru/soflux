import { UserRole } from '../model/user-role.model';

export class UserDto {
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
  role: UserRole;
}
