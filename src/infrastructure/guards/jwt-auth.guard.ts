import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const { authorization }: any = request.headers;
			if (!authorization || authorization.trim() === '') {
				throw new UnauthorizedException('Please provide token');
			}
			const token = authorization.replace(/bearer/gim, '').trim();

			request.user = await this.authService.validateToken(token);

			return true;
		} catch (error) {
			throw new ForbiddenException(error.message || 'session expired! Please sign In');
		}
	}
}
