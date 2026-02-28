import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT authentication guard.
 * Apply to any route that requires a valid Bearer token:
 *   @UseGuards(JwtAuthGuard)
 *
 * On success, request.user is populated with { id, email } (see JwtStrategy.validate).
 * On failure, throws 401 Unauthorized automatically.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
