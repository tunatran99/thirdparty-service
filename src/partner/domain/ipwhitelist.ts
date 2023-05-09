import { CommonEntity } from '@libs/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';

export type IpWhitelistEssentialProperties = Readonly<
  Required<{
    ip: string;
    description: string;
    partnerId: number;

    common: CommonEntity;
  }>
>;

export type IpWhitelistOptionalProperties = Readonly<
  Partial<{
    id: number;
  }>
>;

export type IpWhitelistProperties = IpWhitelistEssentialProperties & IpWhitelistOptionalProperties;

export interface IIpWhitelist {
  create: () => void;
  update: (data: Partial<IpWhitelistProperties>) => void;
  commit: () => void;
}

export class IpWhitelistImplement extends AggregateRoot implements IIpWhitelist {
  private readonly id: number;
  private description: string;

  constructor(properties: IpWhitelistProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new IpWhitelistOpenedEvent(this.id, this.email));
  }

  update(data: Partial<IpWhitelistProperties>): void {
    Object.assign(this, data);
  }
}
