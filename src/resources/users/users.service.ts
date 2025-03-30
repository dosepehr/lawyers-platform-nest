import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from 'src/utils/enums/role.enum';
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      role: Role.Lawyer,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      role: Role.Lawyer,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
