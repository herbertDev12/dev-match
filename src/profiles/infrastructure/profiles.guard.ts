import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Placeholder guard for the profiles DELETE endpoint.
 * Replace with JwtAuthGuard once the auth module is wired up:
 *   @UseGuards(JwtAuthGuard)
 */
@Injectable()
export class ProfilesGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}
