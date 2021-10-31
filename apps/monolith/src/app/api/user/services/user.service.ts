import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserInputType } from '../types/user-input.type';
import { UserRegistrationInputType } from '../types/user-registration-input.type';

@Injectable()
export class UserService {
  async getUser(): Promise<UserDto> {
    return null;
  }

  async login(email: string, password: string): Promise<void> {
    return null;
  }

  async signUp(user: UserRegistrationInputType): Promise<void> {
    return null;
  }

  async updateUserProfile(user: UserInputType): Promise<UserDto> {
    return null;
  }
}
