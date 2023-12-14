import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/command-handler/create.user.handler';
import { UserFactory } from './domain/user.factory';
import { UserRepositoryImplement } from './infratsructure/repository/user.repository.implement';
import { UserController } from './presentation/user.controller';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { JwtStrategy } from './authentication/strategies/jwt.strategy';
import { LogoutUserHandler } from './application/command-handler/logout.user.handler';
import { RefreshTokenFactory } from './domain/refresh.token.factory';
import { RefreshTokenRepositoryImplement } from './infratsructure/repository/refresh.token.repository.implement';
import { JwtRefreshTokenStrategy } from './authentication/strategies/jwt-refresh.strategy';
import { ApiKeyStrategy } from './authentication/strategies/apikey.strategy';
import { CreateRefreshTokenHandler } from './application/command-handler/create.refresh.token.handler';
import { UserQueryImplement } from './infratsructure/query/user.query.implement';
import { FindProfileHandler } from './application/query-handler/find.profile.handler';
import { UpdateUserHandler } from './application/command-handler/update.user.handler';
import { FindAllHandler } from './application/query-handler/find.all.handler';
import { UpdateUserStatusHandler } from './application/command-handler/update.user.status.handler';
import { UpdateUserPassHandler } from './application/command-handler/update.pass.handler';

const infrastructure = [UserRepositoryImplement, RefreshTokenRepositoryImplement, UserQueryImplement];

const application = [
  CreateUserHandler,
  LogoutUserHandler,
  CreateRefreshTokenHandler,
  FindProfileHandler,
  UpdateUserHandler,
  FindAllHandler,
  UpdateUserStatusHandler,
  UpdateUserPassHandler
];

const domain = [UserFactory, RefreshTokenFactory];

const authNStrategies = [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy, ApiKeyStrategy];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [Logger, ...infrastructure, ...application, ...domain, ...authNStrategies],
})
export class UserModule {}
