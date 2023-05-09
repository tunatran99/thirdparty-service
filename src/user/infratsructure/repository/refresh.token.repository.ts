import { IRefreshToken } from 'src/user/domain/refresh.token';

export interface RefreshTokenRepository {
  save: (data: IRefreshToken | IRefreshToken[]) => Promise<void>;
  remove: (tokenId: string) => Promise<void>;
}
