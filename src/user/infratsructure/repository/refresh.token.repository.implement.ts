import { writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';
import { IRefreshToken, RefreshTokenProperties } from 'src/user/domain/refresh.token';
import { RefreshTokenFactory } from 'src/user/domain/refresh.token.factory';
import { UserRefreshTokenEntity } from '../entity/refresh.token';
import { RefreshTokenRepository } from './refresh.token.repository';

export class RefreshTokenRepositoryImplement implements RefreshTokenRepository {
  @Inject() private readonly refreshTokenFactory: RefreshTokenFactory;

  async save(data: IRefreshToken | IRefreshToken[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(UserRefreshTokenEntity).save(entities);
  }

  async remove(tokenId: string): Promise<void> {
    await writeConnection.manager.getRepository(UserRefreshTokenEntity).delete({ tokenId });
  }

  private modelToEntity(model: IRefreshToken): UserRefreshTokenEntity {
    const properties = JSON.parse(JSON.stringify(model)) as RefreshTokenProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: UserRefreshTokenEntity): IRefreshToken {
    return this.refreshTokenFactory.reconstitute({
      ...entity,
    });
  }
}
