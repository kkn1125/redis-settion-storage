import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpAdapter = context.switchToHttp();
    const res = httpAdapter.getResponse() as Response;

    return next.handle().pipe(
      map((data) => ({
        ok: [200, 201].includes(res.statusCode),
        code: res.statusCode,
        data,
      })),
    );
  }
}
