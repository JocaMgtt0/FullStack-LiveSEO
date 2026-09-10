import { Injectable } from '@nestjs/common';
import type { User } from './interfaces/user.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@email.com' },
    { id: 2, name: 'Pedro', email: 'pedro@email.com' },
  ];

  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(newUser);
    return newUser;
  }
}
