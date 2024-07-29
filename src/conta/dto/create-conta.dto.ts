import { IsDateString, IsString, ValidateNested } from 'class-validator';
import { EnderecoDTO } from './endereco.dto';
import { Type } from 'class-transformer';

export class CreateContaDto {
  @IsString()
  nome: string;

  @ValidateNested()
  @Type(() => EnderecoDTO)
  endereco: EnderecoDTO;

  @IsDateString()
  data_nascimento: Date;

  @IsString()
  documento: string;
}
