import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { generateHash } from 'src/utils/funcs/password';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async create(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await generateHash(registerDto.password);
    const newUser = this.userRepository.create({ ...registerDto, password: hashedPassword });
    return this.userRepository.save(newUser);
  }
}
