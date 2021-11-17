import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputDto {
  @Field({ nullable: true })
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zip?: string;
}
