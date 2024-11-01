import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('api.jwtSecret'),
				signOptions: { expiresIn: '3600000000' },
				global: true
			}),
		}),
		TypeOrmModule.forFeature([User]),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
