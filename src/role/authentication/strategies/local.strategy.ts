import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { RequestedUser } from 'src/user/presentation/dto/requested.user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UtilityImplement } from 'libs/utility.module';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    super({
      usernameField: 'username',
    });
  }

  @Inject()
  private readonly userRepository: UserRepositoryImplement;
  @Inject()
  private readonly util: UtilityImplement;

  async validate(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new HttpException(`User ${username} not found`, HttpStatus.UNAUTHORIZED);
    }
    if (user.entity.common.isDisabled) {
      throw new HttpException(`User ${username} disabled`, HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatching = this.util.passwordVerify(password, user.entity.password);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const loginId = uuidv4();
    return new RequestedUser({ ...user.entity, loginId });
  }
}
