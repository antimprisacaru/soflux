import { Logger } from '@nestjs/common';
import User from '../model/user.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';

export class AwsUserRepository implements UserRepository {
    private readonly logger = new Logger(AwsUserRepository.name);
    private readonly docClient = new DocumentClient({
        region: 'eu-central-1'
    });

    constructor(private configService: ConfigService) {}

    async findUser(id: string): Promise<User> {
        return await this.docClient
            .get({ TableName: `soflux-users-${this.configService.get<string>('env')}`, Key: { id } })
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
                TableName: `soflux-users-${this.configService.get<string>('env')}`,
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
    //     .scan({ TableName: this.config.get('usersTable') })
    //     .promise()
    //     .then(result => (result.Items[0] as User).socialAccounts)
    //     .catch(err => {
    //       this.logger.log(this, err);
    //       throw new Error('Whoops! An error has occurred!');
    //     });
    // }

    async saveUser(user: User): Promise<User> {
        this.logger.log(`soflux-users-${this.configService.get<string>('env')}`);
        await this.docClient
            .put(
                {
                    TableName: `soflux-users-${this.configService.get<string>('env')}`,
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
