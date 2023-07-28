import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallets.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async getWalletsData(): Promise<Wallet[]> {
    try {
      return this.walletRepository.find();
    } catch (error) {
      throw new Error('Failed to get wallets data');
    }
  }

  async registerWallet(initialBalance: string): Promise<Wallet> {
    try {
      const wallet: Wallet = {
        id: self.crypto.randomUUID(),
        address: 'tmpAddress',
        balance: BigInt(initialBalance),
      };

      return this.walletRepository.save(wallet);
    } catch (error) {
      throw new Error('Failed to get wallets data.');
    }
  }
}
