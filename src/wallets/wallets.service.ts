import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallets/wallets.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async getWallets(): Promise<Wallet[]> {
    try {
      return await this.walletRepository.find();
    } catch (error) {
      throw new Error('Failed to get wallets data');
    }
  }

  async registerWallet(balance: string): Promise<Wallet> {
    try {
      const wallet: Wallet = {
        id: randomUUID(),
        balance: Number(balance),
      };

      return await this.walletRepository.save(wallet);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBalance(id: string): Promise<Wallet> {
    try {
      return await this.walletRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
