import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ResponsesSecurity() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized Bearer Auth',
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' })
  );
}
