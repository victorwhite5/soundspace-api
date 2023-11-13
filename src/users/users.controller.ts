import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findById(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Get(':number')
  findByNumber(@Param('number') number: string) {
    return this.usersService.findByNumber(number);
  }

  @Patch(':id')
  updateUserProfile( @Param('id', ParseUUIDPipe) id: string, @Body() userProfile: UpdateUserDto) {
    return this.usersService.updateUserProfile(id, userProfile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
