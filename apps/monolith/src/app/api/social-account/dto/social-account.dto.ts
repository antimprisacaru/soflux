import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class SocialAccountDto {
    @Field()
    id: string;

    @Field()
    handle: string;

    @Field()
    name: string;

    @Field()
    posts?: number;

    @Field()
    followers?: number;

    @Field()
    following?: number;

    @Field()
    profilePicture?: string;

    @Field()
    platform: string;

    @Field()
    accountId: string;

    @Field()
    isFake: boolean;
}
