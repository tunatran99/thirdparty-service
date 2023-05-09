import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { createUser } from '../application/command/create.user.command';
import LocalAuthenticationGuard from '../authentication/local-authentication.guard';
import { createUserRequestDTO } from './dto/create.user.request.dto';
import { RequestWithUser } from './dto/requested.user.interface';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { logoutUser } from '../application/command/logout.user.command';
import JwtRefreshGuard from '../authentication/jwt-refresh.guard';
import { createRefreshToken } from '../application/command/create.refresh.token.command';
import { UtilityImplement } from '@libs/utility.module';
import { FindProfile } from '../application/query/find.profile.query';
import { UpdateUserRequestDTO } from './dto/update.user.request.dto';
import { UpdateUser } from '../application/command/update.user.command';

@Controller('user')
export class UserController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Inject()
  private readonly util: UtilityImplement;

  @Post()
  async createUser(@Body() body: createUserRequestDTO): Promise<void> {
    const command = new createUser(body.username, body.password, body.fullname, body.email);
    await this.commandBus.execute(command);
  }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() request: RequestWithUser) {
    const user = request.user;
    const access_token = this.util.generateAccessToken(user.id, user.loginId);
    const refresh_token = this.util.generateRefreshToken(user.id, user.loginId);
    await this.commandBus.execute(new createRefreshToken(user.id, user.loginId));
    return { user, access_token, refresh_token };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  async getCurrentUser(@Req() request: RequestWithUser) {
    const user = request.user;
    return { user };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const user = request.user;
    const access_token = this.util.generateAccessToken(user.id, user.loginId);
    const refresh_token = this.util.generateRefreshToken(user.id, user.loginId);
    return { user, access_token, refresh_token };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser): Promise<void> {
    const user = request.user;
    await this.commandBus.execute(new logoutUser(user.id, user.loginId));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  async findProfileById(@Req() request: RequestWithUser) {
    const user = request.user;
    return await this.queryBus.execute(new FindProfile(user.id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('updateUserInfo')
  async updateUserInfo(@Body() body: UpdateUserRequestDTO): Promise<void> {
    await this.commandBus.execute(new UpdateUser(body));
  }
}
