import { Controller, Get, Body, Patch } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { Transfer } from './transfers.entity';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  async getTransfers(): Promise<Transfer[]> {
    const transfers = await this.transfersService.getTransfers();

    return transfers;
  }

  @Patch()
  async patchTransfers(): Promise<void> {}
}
