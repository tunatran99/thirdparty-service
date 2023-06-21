import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pop_sku_image', synchronize: false })
export class SkuImageEntity {
    @PrimaryColumn()
    SKU_IMAGE_ID?: number;
    @Column()
    SKU_CODE?: string;
    @Column()
    NAME?: string;
    @Column()
    FILE_PATH?: string;
    @Column()
    CREATED_DATE?: Date;
    @Column()
    MODIFIED_DATE?: Date;
    @Column()
    USER_ID?: string;
}