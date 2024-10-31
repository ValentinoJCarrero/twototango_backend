import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
	async signUp(@Body() user: UserDto) {
		await this.authService.signUp(user);

		return { ok: true };
	}

	@Post('log-in')
	async logIn(@Body() user: UserDto) {
		const token = await this.authService.logIn(user);

		return { ok: true, token };
	}
}