import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'group', synchronize: false })
export class GroupEntity {
  @PrimaryColumn()
  GROUP_NUMBER: number;
  @Column()
  GROUP_ID: string;
  @Column()
  GROUP_NAME: string;
  @Column()
  DIV_ID: string;
  @Column()
  DELETED: string;
  @Column()
  LINE_ID: string;
  @Column()
  FILE_ID: string;
}
