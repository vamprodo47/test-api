import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { Wallet } from './wallets.entity';
import { Transfer } from 'src/transfers/transfers.entity';
import { RequestTransferDto } from './dto/requestTransfer.dto';
import { FindTransfersByIdDto } from './dto/findTransfersById.dto';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly transfersService: TransfersService,
  ) {}

  @Get()
  async getWallets(): Promise<Wallet[]> {
    const wallets = await this.walletsService.getWallets();

    return wallets;
  }

  @Post()
  async registerWallet(@Body('balance') balance: string): Promise<Wallet> {
    const wallet = await this.walletsService.registerWallet(balance);

    return wallet;
  }

  @Get('/:id/balance')
  async getBalance(@Param('id') id: string): Promise<Wallet> {
    const wallet = await this.walletsService.getBalance(id);

    return wallet;
  }

  @Post('/:id/transfers')
  async requestTransfer(
    @Param('id') id: string,
    @Body() requestTransferDto: RequestTransferDto,
  ): Promise<Transfer> {
    const requestedTransfer = await this.transfersService.requestTransfer(
      id,
      requestTransferDto,
    );

    return requestedTransfer;
  }

  @Get('/:id/transfers')
  async findTransfersById(
    @Param('id') id: string,
    @Body() findTransfersByIdDto: FindTransfersByIdDto,
  ): Promise<Transfer[]> {
    const requestedTransfer = await this.transfersService.findTransfersById(
      id,
      findTransfersByIdDto,
    );

    return requestedTransfer;
  }
}
