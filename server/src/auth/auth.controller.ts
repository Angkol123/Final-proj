import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string,
    ) {
        return this.authService.register(name, email, password, confirmPassword);
    }

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        try {
            const { email, password } = loginData;
            
            // Basic validation
            if (!email || !password) {
                throw new BadRequestException('Email and password are required');
            }

            return await this.authService.login(email, password);
        } catch (error) {
            console.error('Login controller error:', error);
            
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            
            throw new InternalServerErrorException('An error occurred during login');
        }
    }

    @Get('users')
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    @Get('user-count')
    async getUserCount() {
        return this.authService.getUserCount();
    }

    @Delete('users/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.authService.deleteUser(id);
    }

    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string) {
        return this.authService.sendPasswordResetOTP(email);
    }

    @Post('reset-password')
    async resetPassword(
        @Body('email') email: string,
        @Body('otp') otp: string,
        @Body('newPassword') newPassword: string,
    ) {
        return this.authService.verifyOTPAndResetPassword(email, otp, newPassword);
    }
}
