import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operadora } from '../common/entities/operadora.entity';
import { Telefono } from '../common/entities/telefono.entity';
import { Prefijo } from '../common/entities/prefijo.entity';
import { User } from '../common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operadora, Telefono, Prefijo, User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
