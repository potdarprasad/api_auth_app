import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../shared/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../../shared/dto/signup.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly helper: AuthHelper,
    ){}

    async signUpUser(body: SignUpDto){
        const { firstName, lastName, email, password }: SignUpDto = body;
        let user: User = await this.userRepository.findOne({ where: { email } });
    
        if (user) {
          throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }
    
        user = new User();
    
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = this.helper.encodePassword(password);

        //TODO: send verify account otp to user
    
        return this.userRepository.save(user);
    }

    public async signIn(body: any): Promise<string | never> {
        const { email, password }: any = body;
        const user: User = await this.userRepository.findOne({ where: { email } });
    
        if (!user) {
          throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
    
        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);
    
        if (!isPasswordValid) {
          throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
    
        this.userRepository.update(user.id, { lastLoginAt: new Date() });
    
        return this.helper.generateToken(user);
      }
    
    //   public async refresh(user: User): Promise<string> {
    //     this.userRepository.update(user.id, { lastLoginAt: new Date() });
    
    //     return this.helper.generateToken(user);
    //   }
}
