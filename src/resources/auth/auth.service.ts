
import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
    private usersService: UsersService;
    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    async login(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
}
