import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryColumn()
  id: string;

  @Column()
  balance: number;
}
