import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    private readonly logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(tap(e => e && this.logger.error(e)));
    }
}
