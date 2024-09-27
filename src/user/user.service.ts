import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { UserResponse } from '../common/interfaces/user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateUserExist(createUserDto?.email);

    createUserDto.password = await this.hashPassword(createUserDto.password);
    const userSave = await this.userRepository.save(createUserDto);

    return this.toUserResponse(userSave);
  }

  async validateUser(email: string, password: string): Promise<UserResponse | null> {
    const user = await this.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.toUserResponse(user);
  }

  async findOneByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user ? this.toUserResponse(user) : null;
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'roles'],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const existingUser = await this.findOne(id);

    if (updateUserDto?.email !== existingUser?.email) await this.validateUserExist(updateUserDto?.email);

    if (updateUserDto?.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    const updatedUser = {
      ...existingUser,
      ...updateUserDto,
    };

    await this.userRepository.update(id, updatedUser);

    return this.toUserResponse(updatedUser);
  }

  async remove(id: number): Promise<{ message: string } | UserResponse> {
    await this.findOne(id);

    await this.userRepository.softDelete({ id });
    
    return { message: 'User successfully deleted' };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    };
  }

  private async validateUserExist(email: string) {
    if (!email) return;

    const userExists  = await this.findOneByEmail(email);

    if (userExists ) {
      throw new BadRequestException('User already exists');
    }
  }
}
