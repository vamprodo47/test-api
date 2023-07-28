import { Controller, Get, Post, Body } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallets.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async registerWallet(@Body() initialbalance: string): Promise<Wallet> {
    const wallet = this.walletsService.registerWallet(initialbalance);

    return wallet;
  }

  @Get('/:id/balance')
  async getBalance(): Promise<void> {
    console.log('');
  }
}
