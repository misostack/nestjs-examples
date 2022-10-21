import { UserDto } from './dtos/user-dto';
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './services/user-service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-user')
  createUser(@Body() payload: UserDto): Promise<UserDto> {
    return this.userService.createUser(payload);
  }
}
