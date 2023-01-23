import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../../shared/dto/signup.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signUp(@Body() body: SignUpDto) {
        return this.authService.signUpUser(body);
    }


    @Post('signin')
    signIn(@Body() body: any): Promise<string | never> {
        return this.authService.signIn(body);
    }

    //   @Post('refresh')
    //   @UseGuards(JwtAuthGuard)
    //   private refresh(@Req() { user }: Request): Promise<string | never> {
    //     return this.authService.refresh(user);
    //   }
}
