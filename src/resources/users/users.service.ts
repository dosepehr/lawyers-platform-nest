import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from 'src/utils/enums/role.enum';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const newUser = this.userRepository.create(registerDto);
    return this.userRepository.save(newUser);
  }
}
