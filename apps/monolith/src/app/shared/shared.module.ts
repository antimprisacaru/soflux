import { Module } from '@nestjs/common';
import { CloudConfig } from './config/cloud-config';
import { IdentityProviderFactory } from './identity-provider/identity-provider';

@Module({
    providers: [CloudConfig, IdentityProviderFactory],
    exports: [CloudConfig, IdentityProviderFactory]
})
export class SharedModule {}
