// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Useraccount} from "../entity/entities";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Useraccount)
    private usersRepository: Repository<Useraccount>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findOrCreateUser(userDetails: any): Promise<Useraccount> {
    const { email } = userDetails;

    // Check if user exists
    let user = await this.usersRepository.findOne({ where: { email } });

    // If user doesn't exist, create a new one
    if (!user) {
      user = this.usersRepository.create();
      user.email = userDetails.email;
      user.firstName = userDetails.firstName;
      user.lastName = userDetails.lastName;
      user.picture = userDetails.picture;
      user.googleID = userDetails.googleId;

      await this.usersRepository.save(user);
    }

    return user;
  }

  generateToken(user: Useraccount, rememberMe: boolean = false): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // Use different expiration times based on rememberMe preference
    const expiresIn = rememberMe
      ? this.configService.get<string>('JWT_EXPIRATION_LONG', '30d') // 30 days for remember me
      : this.configService.get<string>('JWT_EXPIRATION', '1h');      // 1 hour for session only

    return this.jwtService.sign(payload, { expiresIn });
  }
}
