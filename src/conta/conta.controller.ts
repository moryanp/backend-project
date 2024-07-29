import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto, @Res() response: Response) {
    try {
      const result = this.contaService.create(createContaDto);
      if (!result) {
        return response
          .status(HttpStatus.CONFLICT)
          .json({ message: 'An account associated with this document is already registered in our database' });
      }
      return response.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  @Get()
  findAll(@Res() response: Response) {
    try {
      return response.status(HttpStatus.OK).json(this.contaService.findAll());
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  @Get(':documento')
  findOne(@Param('documento') documento: string, @Res() response: Response) {
    try {
      const result = this.contaService.findOne(documento);
      if (!result) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'We cannot find an account registered with this document number' });
      }
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  @Patch(':documento')
  update(@Param('documento') documento: string, @Body() updateContaDto: UpdateContaDto, @Res() response: Response) {
    try {
      const result = this.contaService.findOne(documento);
      if (!result) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'We cannot find an account registered with this document number' });
      }
      return response.status(HttpStatus.OK).json(this.contaService.update(documento, updateContaDto));
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  @Delete(':documento')
  remove(@Param('documento') documento: string, @Res() response: Response) {
    try {
      const result = this.contaService.remove(documento);
      if (!result) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'We cannot find an account registered with this document number to delete' });
      }
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}
