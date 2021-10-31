import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserRegistrationInputType {
    @Field({ nullable: true })
    id: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}
