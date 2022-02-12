import { Module } from '@nestjs/common';
import { IdentityProviderFactory } from './identity-provider/identity-provider';
import { SecretsManagerFactory } from './secrets-manager/secrets-manager.service';
import { InstagramHelperService } from './services/instagram-helper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [IdentityProviderFactory, SecretsManagerFactory, InstagramHelperService],
    exports: [IdentityProviderFactory, SecretsManagerFactory, InstagramHelperService]
})
export class SharedModule {}
