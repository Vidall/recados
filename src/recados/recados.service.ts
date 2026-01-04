import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly usersService: UsersService,
  ) {}

  async create(createRecadoDto: CreateRecadoDto) {
    try {
      const { paraId, deId } = createRecadoDto;

      const para = await this.usersService.findOne(paraId);
      const de = await this.usersService.findOne(deId);

      const newRecado = {
        texto: createRecadoDto.texto,
        de: de,
        para: para,
        lido: false,
        data: new Date(),
      };

      const recado = await this.recadoRepository.create(newRecado);

      if (!recado) throw new BadRequestException('Erro ao criar o recado');

      return this.recadoRepository.save(recado);
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao criar o recado');
    }
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          name: true,
        },
      },
    });

    if (!recado) {
      throw new BadRequestException('Recado não encontrado');
    }

    return recado;
  }

  // update(id: number, updateRecadoDto: UpdateRecadoDto) {
  //   const recadoIndex = this.recados.findIndex((item) => item.id === id);
  //   if (recadoIndex === -1) {
  //     return null;
  //   }
  //   const updateRecado = {
  //     ...this.recados[recadoIndex],
  //     ...updateRecadoDto,
  //   };
  //   this.recados[recadoIndex] = updateRecado;
  //   return updateRecado;
  // }

  remove(id: number) {
    return `This action removes a #${id} recado`;
  }
}
