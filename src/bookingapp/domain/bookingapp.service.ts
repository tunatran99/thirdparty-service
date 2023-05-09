import { Injectable, Logger } from '@nestjs/common';
import { Environment, environment } from 'src/environment';
import * as _ from 'lodash';
import got from 'got';

@Injectable()
export class BookingappService {
  private readonly logger = new Logger(BookingappService.name);

  async callBookingApp(sendData: any[], servicePath: string) {
    if (environment.NODE_ENV === Environment.Production) {
      const donwloadMobileLink = `${environment.BOOKINGAPP_HOST}/${servicePath}`;
      const donwloadMobileKEY = environment.BOOKINGAPP_APIKEY;
      const chunks = _.chunk(sendData, environment.API_CHUNK_SIZE);
      for (const [index, chunk] of chunks.entries()) {
        this.logger.log(`Calling: ${donwloadMobileLink} | ${index + 1}/${chunks.length} chunks`);
        await got
          .post(donwloadMobileLink, {
            headers: {
              'x-api-key': donwloadMobileKEY,
            },
            json: chunk,
          })
          .json();
      }
    } else {
      return sendData;
    }
  }
}
