import * as bcrypt from 'bcrypt';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signUp(user: UserDto) {
		const userExists = await this.userRepository.findOneBy({ email: user.email });
		if (userExists) throw new ConflictException('El usuario ya existe');

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.password, salt);

		const savedUser = await this.userRepository.save({
			email: user.email,
			password: hashedPassword,
		});

		return savedUser;
	}

	async logIn(user: UserDto) {
		const foundUser = await this.userRepository.findOne({ where: { email: user.email }, select: ['password', 'id'] });
		if (!foundUser) throw new BadRequestException('Credenciales invalidas.');

		if (!bcrypt.compareSync(user.password, foundUser.password)) throw new BadRequestException('Credenciales invalidas.');

		const token = await this.jwtService.signAsync({ sub: foundUser.id }, { secret: this.configService.get<string>('api.jwtSecret'), expiresIn: '3600000000' });

		return token;
	}

	async validateToken(token: string) {
		try {
			const data = await this.jwtService.verify(token, { secret: this.configService.get<string>('api.jwtSecret'), complete: true });

			const user = await this.userRepository.findOneBy({ id: data.payload.sub });

			return user;
		} catch (e) {
			console.log(e);
			if (e instanceof TokenExpiredError) {
				throw new UnauthorizedException('El token ha caducado');
			}
			throw new Error(e);
		}
	}
}
