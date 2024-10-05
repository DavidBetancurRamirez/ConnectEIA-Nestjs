import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(data => ({
        statusCode: response.statusCode,
        message: response.message || 'Operation successful',
        data: data || null,
        timestamp: new Date(),
      }))
    );
  }
}
