import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from 'src/environment';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { RequestedUser } from 'src/user/presentation/dto/requested.user.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.body?.refresh_token) {
            throw new HttpException('Authentication required', HttpStatus.UNAUTHORIZED);
          }
          return request?.body?.refresh_token.replace('Bearer ', '').replace('bearer ', '');
        },
      ]),
      secretOrKey: environment.JWT_REFRESH_SECRET,
    });
  }

  @Inject()
  private readonly userRepository: UserRepositoryImplement;

  async validate({ id, uuid }: { id: number; uuid: string }) {
    const { entity } = await this.userRepository.findById(id);
    if (!entity.refreshTokens.find((i) => i.tokenId === uuid)) {
      throw new HttpException(`Please login first`, HttpStatus.UNAUTHORIZED);
    }
    return new RequestedUser({ ...entity, loginId: uuid });
  }
}
