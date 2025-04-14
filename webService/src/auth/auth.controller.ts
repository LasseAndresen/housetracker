// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
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
  googleAuth(@Query('rememberMe') rememberMe: string, @Req() req) {
    // Store rememberMe preference in the session
    if (req.session) {
      req.session.rememberMe = rememberMe === 'true';
    }
    // This route initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthCallback(@Req() req, @Res() res: Response) {
    // User has been authenticated
    const user = req.user;

    // Get rememberMe preference from session
    const rememberMe = req.session?.rememberMe === true;

    // Generate JWT token with appropriate expiration
    const token = this.authService.generateToken(user, rememberMe);

    // Redirect to the frontend with the token
    res.redirect(`http://localhost:4200/auth/callback?token=${token}`);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
