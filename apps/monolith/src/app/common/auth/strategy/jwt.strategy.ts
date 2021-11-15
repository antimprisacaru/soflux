import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IdentityProvider } from '../../../shared/identity-provider/identity-provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('IdentityProvider') private identityProvider: IdentityProvider, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(token: any) {
        const user = await this.identityProvider.getUser(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
