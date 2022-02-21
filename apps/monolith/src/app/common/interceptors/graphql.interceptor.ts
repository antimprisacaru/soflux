import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';

@Injectable()
export class GraphqlInterceptor implements NestInterceptor {
    private logger = new Logger('GraphQL Request');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context.getType<GqlContextType>() === 'graphql') {
            const gqlContext = GqlExecutionContext.create(context);
            const info = gqlContext.getInfo();
            const parentType = info.parentType.name;
            const fieldName = info.fieldName;
            const request = `GraphQL ${parentType} - ${fieldName}`;
            const vars = info.variableValues ? omit(info.variableValues, ['password']) : undefined;

            this.logger.log({
                message: `RequestId: ${uuidv4()}`,
                request,
                vars
            });

            return next.handle();
        }
        return next.handle();
    }
}
