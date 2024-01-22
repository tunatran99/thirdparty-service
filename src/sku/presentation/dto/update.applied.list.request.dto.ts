import { IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

class appliedItem {
  partnerId: string;
  sku: string;
  store: string;
  active: boolean;
}

export class UpdateAppliedListRequestDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  readonly items: appliedItem[];
}
