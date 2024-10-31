import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Correo electrónico no válido.' })
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
	password: string;
}
