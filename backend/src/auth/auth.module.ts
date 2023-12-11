import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/typeorm';
// import { JwtAuthStrategy } from '../users/u';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [{
    provide: "AUTH_SERVICE",
    useClass: AuthService
  }, {
    provide: "USER_SERVICE",
    useClass: UsersService
  },
  ]
})
export class AuthModule { }
