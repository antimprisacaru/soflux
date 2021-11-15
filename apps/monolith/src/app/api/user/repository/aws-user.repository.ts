import { Logger } from '@nestjs/common';
import User from '../model/user.model';
import { CloudConfig } from '../../../shared/config/cloud-config';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { UserRepository } from './user.repository';

export class AwsUserRepository implements UserRepository {
    private readonly logger = new Logger(AwsUserRepository.name);
    private readonly docClient = new DocumentClient({
        region: this.config.get['REGION']
    });

    constructor(private config: CloudConfig) {}

    async findUser(id: string): Promise<User> {
        return await this.docClient
            .get({ TableName: 'soflux_users', Key: { id } })
            .promise()
            .then(
                (result): User => ({
                    id: result.Item.id,
                    firstName: result.Item.firstName,
                    lastName: result.Item.lastName,
                    email: result.Item.email
                })
            )
            .catch(err => {
                this.logger.log(err, this);
                throw new Error('Whoops! An error has occurred!');
            });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.docClient
            .scan({
                TableName: 'soflux_users',
                FilterExpression: 'email = :email',
                ExpressionAttributeValues: { ':email': email }
            })
            .promise()
            .then(result => result.Items[0] as User)
            .catch(err => {
                this.logger.log(this, err);
                throw new Error('Whoops! An error has occurred!');
            });
    }

    // async fetchSocialAccounts(): Promise<socialAccountModel[]> {
    //   return await this.docClient
    //     .scan({ TableName: 'soflux_users' })
    //     .promise()
    //     .then(result => (result.Items[0] as User).socialAccounts)
    //     .catch(err => {
    //       this.logger.log(this, err);
    //       throw new Error('Whoops! An error has occurred!');
    //     });
    // }

    async saveUser(user: User): Promise<User> {
        await this.docClient
            .put(
                {
                    TableName: 'soflux_users',
                    Item: user
                },
                err => {
                    if (err) {
                        this.logger.log(err.message, this);
                        throw new Error('Whoops! An error has occurred!');
                    }
                }
            )
            .promise();
        return this.findUser(user.id);
    }

    async removeAll(): Promise<void> {
        this.logger.log('pula inca');
    }
}
