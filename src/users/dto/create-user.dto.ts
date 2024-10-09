import { User } from '@prisma/client';

type ExcludeUserType = 'id' | 'createdAt' | 'updatedAt';

export class CreateUserDto implements Omit<User, ExcludeUserType> {
  email!: string;
  username!: string;
  phoneNo!: string;
  password!: string;
}
