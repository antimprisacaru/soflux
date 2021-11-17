import { Injectable } from '@nestjs/common';
import { AwsConfigType } from './aws-config.type';
import { ConfigService } from '@nestjs/config';

export type CloudProvider = 'aws' | 'google' | undefined;

@Injectable()
export class CloudConfig {
    private readonly _provider: CloudProvider;

    constructor(private configService: ConfigService) {
        switch (process.env.CLOUD_PROVIDER) {
            case 'aws':
            case 'google':
                this._provider = process.env.CLOUD_PROVIDER;
                return;
            default:
                this._provider = undefined;
                return;
        }
    }

    get(key: AwsConfigType): any {
        return this.configService.get<string>(`${this.provider} + '.' + ${key}`);
    }

    get provider(): CloudProvider {
        return this._provider;
    }
}
