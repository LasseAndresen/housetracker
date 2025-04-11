// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {GoogleAuthGuard} from "./guards/google-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    console.log('Google auth called');
    // This route initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthCallback(@Req() req, @Res() res: Response) {
    // User has been authenticated
    const user = req.user;

    // Generate JWT token
    const token = this.authService.generateToken(user);

    // Redirect to the frontend with the token
    console.log('Redirecting to frontend ', token);
    res.redirect(`http://localhost:4200/auth/callback?token=${token}`);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    console.log('Returning profile ', req.user);
    return req.user;
  }
}
