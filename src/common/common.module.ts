import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
})
export class CommonModule {}
