import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { FindPartnerByApikeyQuery } from 'src/partner/application/query/find.partner.byapikey.query';
import { FindPartnerByApikeyResult } from 'src/partner/application/query/find.partner.byapikey.result';
import { RequestedPartner } from 'src/user/presentation/dto/requested.partner.interface';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'apikey') {
  constructor(readonly queryBus: QueryBus) {
    super({ header: 'Authorization', prefix: '' }, true, async (apiKey, done, request) => {
      return await this.validate(apiKey, done, request);
    });
  }
  async validate(
    apiKey: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: (error: Error, data) => {},
    req: Request,
  ) {
    try {
      const partner = await this.queryBus.execute<FindPartnerByApikeyQuery, FindPartnerByApikeyResult>(
        new FindPartnerByApikeyQuery(apiKey),
      );
      if (!partner) {
        throw new HttpException(`Apikey not found`, HttpStatus.UNAUTHORIZED);
      }
      if (partner.ipWhitelists && partner.ipWhitelists.length > 0) {
        const requestip = req.clientIp;
        const acceptIP = partner.ipWhitelists.includes(requestip);
        if (!acceptIP) {
          const xLocal = req.headers['x-bd-local'];
          if (xLocal !== 'local') {
            throw new HttpException(
              `Partner: ${partner.name} - ID: ${partner.id} | IP Access Denied`,
              HttpStatus.UNAUTHORIZED,
            );
          }
        }
      }
      done(null, new RequestedPartner(partner));
    } catch (error) {
      done(error, null);
    }
  }
}
