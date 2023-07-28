import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallets.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

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
}
