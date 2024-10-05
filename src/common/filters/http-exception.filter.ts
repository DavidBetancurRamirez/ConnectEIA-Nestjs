import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const apiResponse: ApiResponse<any> = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      error: exception.getResponse() || null,
      timestamp: new Date(),
    };

    response.status(status).json(apiResponse);
  }
}
