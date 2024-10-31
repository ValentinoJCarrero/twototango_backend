import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from './config/options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
	imports: [
		ConfigModule.forRoot(ConfigModuleOptions),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('database.host'),
				port: configService.get<number | undefined>('database.port'),
				username: configService.get<string>('database.user'),
				password: configService.get<string>('database.pass'),
				database: configService.get<string>('database.name'),
				entities: [join(__dirname, '**', '*.entity.{ts,js}')],
				synchronize: true,
				dropSchema: true,
				logging: false,
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
