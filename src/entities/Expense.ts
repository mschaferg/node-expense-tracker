import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expense {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   description!: string;

   @Column('float')
   amount!: number;

   @Column()
   date!: string;

   @Column()
   user_id!: number;

   @Column()
   created_at!: Date;

   @Column()
   updated_at!: Date;
}
