import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly texto: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly deId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly paraId: number;
}
