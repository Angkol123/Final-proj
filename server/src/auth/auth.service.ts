import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as crypto from 'crypto'
import { access } from 'fs';
import { use } from 'passport';
import { User } from '../entities/user.entity'
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    private transporter;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        // Setup nodemailer
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }

    async register(name: string, email: string, password: string, confirmPassword: string) {
        if(password !== confirmPassword) {
            throw new UnauthorizedException('Passwords do not match');
        }
        return await this.usersService.createUser(name, email, password, confirmPassword);
    }

    async login(email: string, password: string) {
        // Input validation
        if (!email || !password) {
            throw new UnauthorizedException('Email and password are required');
        }

        try {
            // Find user
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }

            // Verify password
            const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
            if (user.password !== hashedPassword) {
                throw new UnauthorizedException('Invalid email or password');
            }

            // Generate token
            const payload = { id: user.id, email: user.email };
            const accessToken = this.jwtService.sign(payload);

            // Return user data
            return {
                access_token: accessToken,
                name: user.name,
                email: user.email,
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async getAllUsers(): Promise<Pick<User, 'name' | 'email'>[]> {
        return this.usersService.getAllUsers();
    }

    async getUserCount(): Promise<{ totalUsers: number }> {
        const count = await this.usersService.getUserCount();
        return { totalUsers: count };
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        try {
            await this.usersService.deleteUser(id);
            return { message: `User with ID ${id} has been deleted successfully` };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to delete user');
        }
    }

    async sendPasswordResetOTP(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP in database (you'll need to add this field to user entity)
        await this.usersService.storeOTP(email, otp);

        // Send email
        await this.transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `
                <h1>Password Reset Request</h1>
                <p>Your OTP for password reset is: <strong>${otp}</strong></p>
                <p>This OTP will expire in 10 minutes.</p>
            `,
        });

        return { message: 'OTP sent successfully' };
    }

    async verifyOTPAndResetPassword(email: string, otp: string, newPassword: string) {
        const isValid = await this.usersService.verifyOTP(email, otp);
        if (!isValid) {
            throw new UnauthorizedException('Invalid or expired OTP');
        }

        // Reset password
        await this.usersService.updatePassword(email, newPassword);
        return { message: 'Password reset successful' };
    }
}
