import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletId: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  status: string;
}
