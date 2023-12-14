import { IQuery } from '@nestjs/cqrs';

export class FindRole implements IQuery {}
export class FindStore implements IQuery {}
export class FindPartner implements IQuery {}
