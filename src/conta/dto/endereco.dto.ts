import { IsOptional, IsString } from 'class-validator';

export class EnderecoDTO {
  @IsString()
  @IsOptional()
  cidade: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  pais: string;
}
