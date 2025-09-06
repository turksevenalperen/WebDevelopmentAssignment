import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      username: 'ahmetyilmaz',
      email: 'ahmet.yilmaz@hotmail.com',
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      username: 'aysedemir',
      email: 'ayse.demir@gmail.com',
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      username: 'mehmetkaya',
      email: 'mehmet.kaya@outlook.com',
    },
    {
      id: 4,
      name: 'Fatma Özkan',
      username: 'fatmaozkan',
      email: 'fatma.ozkan@yahoo.com',
    },
    {
      id: 5,
      name: 'Emre Şahin',
      username: 'emresahin',
      email: 'emre.sahin@hotmail.com',
    },
  ];

  private nextId = 6;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
