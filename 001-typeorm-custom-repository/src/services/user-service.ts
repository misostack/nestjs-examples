import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToInstance } from 'class-transformer';
import { UserDto } from 'src/dtos/user-dto';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDto: Partial<UserDto>) {
    const userEntity = await this.userRepository.save(
      this.userRepository.create(userDto),
    );
    if (userEntity) {
      return instanceToInstance<UserDto>(userEntity);
    }
    return null;
  }
}
