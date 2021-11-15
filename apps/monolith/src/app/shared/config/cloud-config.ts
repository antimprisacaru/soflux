import { Injectable } from '@nestjs/common';
import { AwsConfigType } from './aws-config.type';

export type CloudProvider = 'aws' | 'google' | undefined;

@Injectable()
export class CloudConfig {
    get(key: AwsConfigType): any {
        return process.env[key];
    }

    provider(): CloudProvider {
        switch (process.env.CLOUD_PROVIDER) {
            case 'aws':
            case 'google':
                return process.env.CLOUD_PROVIDER;
            default:
                return undefined;
        }
    }
}
