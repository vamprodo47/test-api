import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class WalletsService {
  async getWalletsData(): Promise<void> {
    fs.readFileSync('');
  }
}
