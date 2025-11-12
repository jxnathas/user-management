import { Profile } from './profile';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
}

export interface UserWithProfile extends User {
  profile: Profile;
}
