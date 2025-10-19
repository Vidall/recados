import { Injectable } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Primeiro recado',
      de: 'Alice',
      para: 'Bob',
      lido: false,
      data: new Date(),
    },
  ];

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = { id, ...createRecadoDto, lido: false, data: new Date() };
    this.recados.push(newRecado);

    return newRecado;
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    return this.recados.find((item) => item.id === id);
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recadoIndex = this.recados.findIndex((item) => item.id === id);
    if (recadoIndex === -1) {
      return null;
    }
    const updateRecado = {
      ...this.recados[recadoIndex],
      ...updateRecadoDto,
    };
    this.recados[recadoIndex] = updateRecado;
    return updateRecado;
  }

  remove(id: number) {
    return `This action removes a #${id} recado`;
  }
}
