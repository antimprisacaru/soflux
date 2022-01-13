import { Module } from '@nestjs/common';
import { IdentityProviderFactory } from './identity-provider/identity-provider';

@Module({
    providers: [IdentityProviderFactory],
    exports: [IdentityProviderFactory]
})
export class SharedModule {}
