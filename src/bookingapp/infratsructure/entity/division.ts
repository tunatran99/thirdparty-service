import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'division', synchronize: false })
export class DivisionEntity {
  @PrimaryColumn()
  DIV_NUMBER: number;
  @Column()
  DIV_ID: string;
  @Column()
  DIV_NAME: string;
  @Column()
  LINE_ID: string;
  @Column()
  DELETED: string;
  @Column()
  FILE_ID: string;
}
