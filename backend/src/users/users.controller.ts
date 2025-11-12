import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('with-profiles')
  findAllWithProfiles() {
    return this.usersService.findAllWithProfiles();
  }

  @Get()
  findAll(@Query('profileId') profileId?: string) {
    if (profileId) {
      return this.usersService.findByProfileIdWithProfiles(profileId);
    }
    return this.usersService.findAllWithProfiles();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const user = this.usersService.findByIdWithProfile(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    const user = this.usersService.activate(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    const user = this.usersService.deactivate(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
