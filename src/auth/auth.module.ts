import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './infrastructure/http/auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ValidateUserUseCase } from './application/use-cases/validate-user/validate-user.use-case';
import { LoginUseCase } from './application/use-cases/login/login.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token/refresh-token/refresh-token.use-case';
import { CreateRefreshTokenUseCase } from './application/use-cases/refresh-token/create-refresh-token/create-refresh-token.use-cae';
import { RefreshTokenRepository } from './domain/repository/refresh-token.repository';
import { RefreshTokenOrmEntity } from './infrastructure/persitence/entities/refresh-token.orm-entity';
import { RefreshTokenRepositoryImpl } from './infrastructure/repositories/refresh-token.impl-repository';
import { LogoutUseCase } from './application/use-cases/logout/logout.use-case';
import { UsersModule } from 'src/app/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshTokenOrmEntity]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ValidateUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    CreateRefreshTokenUseCase,
    LogoutUseCase,
    {
      provide: RefreshTokenRepository,
      useClass: RefreshTokenRepositoryImpl,
    },
  ],
})
export class AuthModule {}
