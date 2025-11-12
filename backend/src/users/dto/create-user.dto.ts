import { Profile } from '../../models/profile';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  profileId: string;
}

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
  profile?: Profile;
}
