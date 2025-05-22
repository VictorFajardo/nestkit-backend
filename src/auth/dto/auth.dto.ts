import { UserRole } from '@prisma/client';

export class AuthDto {
  email: string;
  name?: string;
  role: UserRole;
}
