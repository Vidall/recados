import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createdUserFinal = {
        ...createUserDto,
        createdAt: new Date(),
      };

      const createdUser = await this.userRepository.save(createdUserFinal);

      return createdUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Email já cadastrado');
      }
      console.log('o erro: ', error);
      throw error;
    }
  }

  findAll() {
    try {
      const users = this.userRepository.find();

      if (!users) {
        throw new NotFoundException('Nenhum usuário encontrado');
      }

      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar usuários');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar usuário');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
