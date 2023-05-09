import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { CustomLogger } from 'src/log/domain/custom.log.implement';
import { RequestedPartner } from 'src/user/presentation/dto/requested.partner.interface';

export class A3PLogInterceptor implements NestInterceptor {
  constructor(@Inject(CustomLogger) private logger: CustomLogger) {}

  intercept(context: ExecutionContext, next: CallHandler<object>): Observable<object> | Promise<Observable<object>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const isSystemCall = request.user instanceof RequestedPartner ? false : true;
        const partnerId = !isSystemCall ? (request.user as RequestedPartner).id : undefined;
        const statusCode = response.statusCode;
        const isFailed = statusCode >= 400;
        const requestHeader = request.headers ? JSON.stringify(request.headers) : undefined;
        const requestBody = request.body ? JSON.stringify(request.body) : undefined;
        const responseBody = data ? JSON.stringify(data) : undefined;

        this.logger.customLog({
          url: request.url,
          method: request.method,
          ip: request.clientIp,
          isSystemCall,
          partnerId,
          statusCode,
          isFailed,
          requestHeader,
          requestBody,
          responseBody,
        });

        return data;
      }),
    );
  }
}
