import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { Transfer } from '../entities/transfers/transfers.entity';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { FindTransfersByIdDto } from './dto/findTransfersById.dto';
import { Wallet } from 'src/entities/wallets/wallets.entity';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  async getTransfers(): Promise<Transfer[]> {
    const transfers = await this.transfersService.getTransfers();

    return transfers;
  }

  @Get('/wallet/:walletId')
  async findTransfersById(
    @Param('walletId') walletId: string,
    @Query() findTransfersByIdDto: FindTransfersByIdDto,
  ): Promise<Transfer[]> {
    const requestedTransfer = await this.transfersService.findTransfersById(
      walletId,
      findTransfersByIdDto,
    );

    return requestedTransfer;
  }

  @Post('/wallet/:walletId')
  async createTransfer(
    @Param('walletId') walletId: string,
    @Body() createTransferDto: CreateTransferDto,
  ): Promise<Transfer> {
    const requestedTransfer = await this.transfersService.createTransfer(
      walletId,
      createTransferDto,
    );

    return requestedTransfer;
  }

  @Patch()
  async patchTransfers(): Promise<Transfer[]> {
    const patchedTransfers = await this.transfersService.patchTransfers();

    return patchedTransfers;
  }
}
