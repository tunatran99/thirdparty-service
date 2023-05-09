import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'line', synchronize: false })
export class LineEntity {
  @PrimaryColumn()
  LINE_NUMBER: number;
  @Column()
  LINE_ID: string;
  @Column()
  LINE_NAME: string;
  @Column()
  DELETED: string;
  @Column()
  FILE_ID: string;
}
