import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallets.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TransfersModule } from 'src/transfers/transfers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), TransfersModule],
  providers: [WalletsService],
  controllers: [WalletsController],
  exports: [WalletsService],
})
export class WalletsModule {}
