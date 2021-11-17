import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegistrationInputDto {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}
