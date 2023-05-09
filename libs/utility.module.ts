import { Global, Injectable, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { environment } from 'src/environment';
import * as ExcelJS from 'exceljs';

interface Utility {
  passwordHash: (secret: string) => string;
  passwordVerify: (plainPass: string, hashedPass: string) => boolean;
  generateAccessToken: (id: number, uuid: string) => string;
  generateRefreshToken: (id: number, uuid: string) => string;
  writeExcelFile: (columns: { key: string; header: string }[], data: any, path: string) => Promise<void>;
}

@Injectable()
export class UtilityImplement implements Utility {
  constructor(private readonly jwtService: JwtService) {}
  passwordHash(secret: string): string {
    return bcrypt.hashSync(secret, 10);
  }

  passwordVerify(plainPass: string, hashedPass: string): boolean {
    return bcrypt.compareSync(plainPass, hashedPass);
  }

  generateAccessToken(id: number, uuid: string): string {
    return this.jwtService.sign(
      { id, uuid },
      {
        secret: environment.JWT_ACCESS_SECRET,
        expiresIn: `${environment.JWT_ACCESS_EXPIRE}s`,
      },
    );
  }
  generateRefreshToken(id: number, uuid: string): string {
    return this.jwtService.sign(
      { id, uuid },
      {
        secret: environment.JWT_REFRESH_SECRET,
        expiresIn: `${environment.JWT_REFRESH_EXPIRE}s`,
      },
    );
  }
  async writeExcelFile(columns: { key: string; header: string }[], data: any[], path: string): Promise<void> {
    const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: path,
    });
    const ws = wb.addWorksheet(undefined, {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    ws.columns = columns;
    for (const item of data) {
      ws.addRow(item).commit();
    }
    await wb.commit();
  }
}

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
