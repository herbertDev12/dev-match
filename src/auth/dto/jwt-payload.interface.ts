/**
 * Represents the authenticated user payload extracted from a JWT.
 * Extend this with additional fields as needed (e.g., roles, permissions).
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
}

export interface AuthUser {
  id: string;
  email: string;
}
