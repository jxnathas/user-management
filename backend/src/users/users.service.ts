import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserWithProfile } from '../models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { seedUsers } from '../seed';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
  private users: User[] = [...seedUsers];

  constructor(private readonly profilesService: ProfilesService) {}

  private enrichUserWithProfile(user: User): UserWithProfile {
    const profile = this.profilesService.findById(user.profileId);
    return {
      ...user,
      profile: profile || { id: user.profileId, name: 'Unknown' },
    };
  }

  create(createUserDto: CreateUserDto): User | null {
    const user: User = {
      id: uuidv4() as string,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      profileId: createUserDto.profileId,
      isActive: true,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findAllWithProfiles(): UserWithProfile[] {
    return this.users.map((user) => this.enrichUserWithProfile(user));
  }

  findById(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  findByIdWithProfile(id: string): UserWithProfile | null {
    const user = this.findById(id);
    return user ? this.enrichUserWithProfile(user) : null;
  }

  findByProfileId(profileId: string): User[] {
    return this.users.filter((user) => user.profileId === profileId);
  }

  findByProfileIdWithProfiles(profileId: string): UserWithProfile[] {
    return this.findByProfileId(profileId).map((user) =>
      this.enrichUserWithProfile(user),
    );
  }

  update(id: string, updateUserDto: UpdateUserDto): User | null {
    const user = this.findById(id);
    if (!user) {
      return null;
    }

    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.profileId !== undefined) {
      user.profileId = updateUserDto.profileId;
    }

    return user;
  }

  remove(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  activate(id: string): User | null {
    const user = this.findById(id);
    if (!user) {
      return null;
    }
    user.isActive = true;
    return user;
  }

  deactivate(id: string): User | null {
    const user = this.findById(id);
    if (!user) {
      return null;
    }
    user.isActive = false;
    return user;
  }
}
