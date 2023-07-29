import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../entities/transfers/transfers.entity';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { Wallet } from 'src/entities/wallets/wallets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Wallet])],
  providers: [TransfersService],
  controllers: [TransfersController],
  exports: [TransfersService],
})
export class TransfersModule {}
