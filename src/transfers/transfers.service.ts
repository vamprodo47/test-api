import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Repository } from 'typeorm';
import { RequestTransferDto } from 'src/wallets/dto/request-transfer.dto';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
  ) {}

  async getTransfers(): Promise<Transfer[]> {
    try {
      return await this.transferRepository.find();
    } catch (error) {
      throw new Error('Failed to get transfers data');
    }
  }

  async requestTransfer(
    walletId: string,
    requestTransferDto: RequestTransferDto,
  ): Promise<Transfer> {
    try {
      const transfer: Partial<Transfer> = {
        walletId,
        type: requestTransferDto.type,
        amount: requestTransferDto.amount,
        status: '처리중',
      };
      const requestedTransfer = await this.transferRepository.save(transfer);

      return requestedTransfer;
    } catch (error) {
      throw new Error('Failed to request Transfer');
    }
  }
}
