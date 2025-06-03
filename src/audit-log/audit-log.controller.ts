import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '@common/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/decorators/guards/roles.guard';
import { AuditLogService } from './audit-log.service';
import { QueryAuditDto } from './dto/query-audit.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  async getAuditLogs(@Query() query: QueryAuditDto) {
    return this.auditLogService.getAuditLogs(query);
  }
}
