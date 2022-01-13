import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IdentityProvider } from '../../../shared/identity-provider/identity-provider';

const cookieExtractor = (req: Request): string | null => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('IdentityProvider') private identityProvider: IdentityProvider,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: configService.get<string>('jwt_secret')
        });
    }

    async validate(payload: string): Promise<string> {
        return await this.identityProvider.getUser(payload);
    }
}
