import { Controller, Get, Post, Body } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallets.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  async getWallets(): Promise<Wallet[]> {
    const wallet = await this.walletsService.getWallets();

    return wallet;
  }

  @Post()
  async registerWallet(@Body('balance') balance: string): Promise<Wallet> {
    const wallet = await this.walletsService.registerWallet(balance);

    return wallet;
  }

  @Get('/:id/balance')
  async getBalance(): Promise<void> {
    console.log('');
  }
}
