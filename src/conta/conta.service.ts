import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { DataBaseService } from './conta.database';
import { Conta } from './entities/conta.entity';
import * as crypto from 'crypto';

@Injectable()
export class ContaService {
  constructor(private readonly databaseService: DataBaseService) {}

  create(createContaDto: CreateContaDto): Conta {
    const result = this.databaseService.find(createContaDto.documento);
    if (result) {
      return null;
    }
    let novaConta: Conta = new Conta();
    novaConta.documento = createContaDto.documento.replace(/\D/g, '');
    novaConta.nome = createContaDto.nome;
    novaConta.data_nascimento = createContaDto.data_nascimento;
    novaConta.cidade = createContaDto.endereco.cidade;
    if (createContaDto.endereco.estado) {
      novaConta.estado = createContaDto.endereco.estado;
    }
    novaConta.pais = createContaDto.endereco.pais;
    novaConta.numero_conta = this.createAccountNumber(createContaDto.documento);
    novaConta.numero_agencia = this.createAgencyNumber();

    return this.databaseService.insert(novaConta);
  }

  findAll() {
    return this.databaseService.findAll();
  }

  findOne(documento: string) {
    const conta = this.databaseService.find(documento);
    if (!conta) {
      return null;
    }

    return conta;
  }

  update(documento: string, updateContaDto: UpdateContaDto) {
    const conta = this.databaseService.find(documento);
    if (!conta) {
      return null;
    }
    Object.assign(conta, {
      documento: updateContaDto.documento.replace(/\D/g, '') ?? conta.documento,
      nome: updateContaDto.nome ?? conta.nome,
      data_nascimento: updateContaDto.data_nascimento ?? conta.data_nascimento,
      cidade: updateContaDto.endereco?.cidade ?? conta.cidade,
      estado: updateContaDto.endereco?.estado ?? conta.estado,
      pais: updateContaDto.endereco?.pais ?? conta.pais,
    });
    this.databaseService.update(conta);

    return conta;
  }

  remove(documento: string): Conta {
    const result = this.databaseService.find(documento);
    if (!result) {
      return null;
    }
    this.databaseService.delete(documento);

    return result;
  }

  createAccountNumber(document: string, length: number = 8): string {
    const hash = crypto.createHash('sha256').update(document).digest('hex');
    const hashAsNumber = BigInt('0x' + hash);
    const accountNumber = hashAsNumber.toString().slice(-length);

    return accountNumber;
  }

  createAgencyNumber(length: number = 4): string {
    let agencyNumber = '';
    for (let i = 0; i < length; i++) {
      agencyNumber += Math.floor(Math.random() * 10);
    }

    return agencyNumber;
  }
}
