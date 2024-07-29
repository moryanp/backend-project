import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { DataBaseService } from './conta.database';

@Module({
  controllers: [ContaController],
  providers: [ContaService, DataBaseService],
})
export class ContaModule {}
