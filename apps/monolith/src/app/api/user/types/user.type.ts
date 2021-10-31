import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../model/user-role.model';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

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

  @Field({ nullable: true })
  role: string;
}
