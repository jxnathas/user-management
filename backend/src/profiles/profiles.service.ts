import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../models/profile';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { seedProfiles } from '../seed';

@Injectable()
export class ProfilesService {
  private profiles: Profile[] = [...seedProfiles];

  create(createProfileDto: CreateProfileDto): Profile {
    const profile: Profile = {
      id: uuidv4(),
      name: createProfileDto.name,
    };
    this.profiles.push(profile);
    return profile;
  }

  findAll(): Profile[] {
    return this.profiles;
  }

  findById(id: string): Profile | null {
    return this.profiles.find((profile) => profile.id === id) || null;
  }

  update(id: string, updateProfileDto: UpdateProfileDto): Profile | null {
    const profile = this.findById(id);
    if (!profile) {
      return null;
    }
    if (updateProfileDto.name) {
      profile.name = updateProfileDto.name;
    }
    return profile;
  }

  remove(id: string): boolean {
    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      return false;
    }
    this.profiles.splice(index, 1);
    return true;
  }
}
