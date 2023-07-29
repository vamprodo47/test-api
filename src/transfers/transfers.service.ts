import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Repository } from 'typeorm';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { FindTransfersByIdDto } from './dto/findTransfersById.dto';

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

  async createTransfer(
    walletId: string,
    createTransferDto: CreateTransferDto,
  ): Promise<Transfer> {
    try {
      const transfer: Partial<Transfer> = {
        walletId,
        type: createTransferDto.type,
        amount: createTransferDto.amount,
        status: '처리중',
      };
      const requestedTransfer = await this.transferRepository.save(transfer);

      return requestedTransfer;
    } catch (error) {
      throw new Error('Failed to request Transfer');
    }
  }

  async findTransfersById(
    walletId: string,
    findTransfersByIdDto: FindTransfersByIdDto,
  ): Promise<Transfer[]> {
    try {
      const transfers = await this.transferRepository.find({
        where: { walletId },
        skip: findTransfersByIdDto.offset,
        take: findTransfersByIdDto.maxCount,
      });

      return transfers;
    } catch (error) {
      throw new Error('Failed to request Transfer');
    }
  }
}
