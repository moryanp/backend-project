import { IsDateString, IsString } from 'class-validator';

export class Conta {
  @IsString()
  documento: string;

  @IsString()
  nome: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  pais: string;

  @IsDateString()
  data_nascimento: Date;

  @IsString()
  numero_conta: string;

  @IsString()
  numero_agencia: string;
}
