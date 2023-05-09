import { Request } from 'express';

type RequestedPartnerProperties = Readonly<{
  id: number;
  name: string;
  isDisabled: boolean;
}>;

const listProp = ['id', 'name', 'isDisabled'];

export class RequestedPartner implements RequestedPartnerProperties {
  readonly id: number;
  readonly name: string;
  readonly isDisabled: boolean;

  constructor(properties: Partial<RequestedPartnerProperties>) {
    listProp.forEach((prop) => (this[prop] = properties[prop]));
  }
}

export interface RequestWithPartner extends Request {
  user: RequestedPartner;
}
