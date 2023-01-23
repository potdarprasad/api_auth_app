import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {

    @Get('')
    @UseGuards(JwtAuthGuard)
    get() {
        return 'hello users';
    }
}
