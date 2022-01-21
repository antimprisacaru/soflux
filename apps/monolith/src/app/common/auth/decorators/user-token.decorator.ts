import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserToken = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const token = GqlExecutionContext.create(context).getContext().req.headers.authorization;
    return token ? token.split(' ')[1] : undefined;
});
