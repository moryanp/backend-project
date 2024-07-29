import { Injectable } from '@nestjs/common';
import { Conta } from './entities/conta.entity';

Injectable();
export class DataBaseService {
  private database: Conta[];

  constructor() {
    this.database = new Array();
  }

  insert(novaConta: Conta): Conta {
    this.database.push(novaConta);
    return novaConta;
  }

  find(documento: string) {
    return this.database.find((conta) => conta.documento === documento.replace(/\D/g, ''));
  }

  findAll() {
    return this.database;
  }

  update(atualizacaoConta: Conta): Conta {
    const index = this.database.findIndex((conta) => conta.documento === atualizacaoConta.documento);

    console.log(atualizacaoConta);

    this.database[index] = atualizacaoConta;

    return atualizacaoConta;
  }

  delete(documento: string) {
    this.database = this.database.filter((conta) => conta.documento !== documento.replace(/\D/g, ''));
  }
}
