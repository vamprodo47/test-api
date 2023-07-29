import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '../entities/transfers/transfers.entity';
import { Wallet } from 'src/entities/wallets/wallets.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { FindTransfersByIdDto } from './dto/findTransfersById.dto';

type TransferType = '입금' | '출금';
type StatusType = '처리중' | '처리됨;';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly dataSource: DataSource,
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
      const isExistedWallet = await this.walletRepository.findOneBy({
        id: walletId,
      });

      if (!isExistedWallet) {
        throw new Error('존재하지 않는 지갑입니다.');
      }

      const transfer: Partial<Transfer> = {
        walletId,
        type: createTransferDto.type,
        amount: createTransferDto.amount,
        status: '처리중',
      };
      const requestedTransfer = await this.transferRepository.save(transfer);

      return requestedTransfer;
    } catch (error) {
      throw new Error(error);
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

  async patchTransfers(): Promise<Transfer[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      const completedTransfers = [];
      const transfers = JSON.parse(
        JSON.stringify(
          await this.transferRepository.find({
            where: { status: '처리중' },
          }),
        ),
      );

      for (let i = 0; i < transfers.length; i++) {
        const transferType = transfers[i].type;
        const walletId = transfers[i].walletId;
        const requestedBalance = transfers[i].amount;
        const wallet = await this.walletRepository.findOneBy({ id: walletId });

        if (!wallet) {
          // throw new Error('존재하지 않는 지갑입니다.');
        } else if (transferType === '입금') {
          transfers[i].status = '처리됨';
          wallet.balance += requestedBalance;
          const patchedTransfer = await this.transferRepository.save(
            transfers[i],
          );
          completedTransfers.push(patchedTransfer);

          await this.walletRepository.save(wallet);
        } else if (
          transferType === '출금' &&
          wallet.balance > requestedBalance
        ) {
          transfers[i].status = '처리됨';
          wallet.balance -= requestedBalance;
          const patchedTransfer = await this.transferRepository.save(
            transfers[i],
          );
          completedTransfers.push(patchedTransfer);

          await this.walletRepository.save(wallet);
        } else if (
          transferType === '출금' &&
          wallet.balance <= requestedBalance
        ) {
          // throw new Error('잔고가 부족합니다.');
        }
      }
      await queryRunner.commitTransaction();

      return completedTransfers;
    } catch (error) {
      await queryRunner.commitTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
