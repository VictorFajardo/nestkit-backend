import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AuditAction, AuditContext } from '@common/constants/audit.enum'; // Optional: use enums for type safety

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async logEvent({
    userId,
    action,
    context,
    metadata = {},
  }: {
    userId: string;
    action: AuditAction;
    context: AuditContext;
    metadata?: Record<string, any>;
  }): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId,
          action,
          context,
          metadata,
        },
      });

      this.logger.debug(
        `Audit log written: ${action} (${context}) by user ${userId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to write audit log: ${error.message}`,
        error.stack,
      );
    }
  }
}
