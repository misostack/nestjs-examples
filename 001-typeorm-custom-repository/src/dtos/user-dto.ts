import { plainToInstance } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DTO_GROUPS } from './common';

export class UserDto {
  @IsNotEmpty({
    groups: [DTO_GROUPS.RETRIEVE, DTO_GROUPS.UPDATE],
  })
  id: number;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  isActive: boolean;
}
