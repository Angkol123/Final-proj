import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(name: string, email: string, password: string, confirmPassword: string): Promise<User> {
        const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
        const user = this.userRepository.create({ name, email, password: hashedPassword, confirmPassword: hashedPassword });
        return await this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async getAllUsers(): Promise<Pick<User, 'name' | 'email'>[]> {
        return this.userRepository.find({
            select: ['name', 'email']
        });
    }

    async getUserCount(): Promise<number> {
        return await this.userRepository.count();
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.userRepository.delete(id);
    }

    async storeOTP(email: string, otp: string) {
        const user = await this.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');
        
        user.resetOTP = otp;
        user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await this.userRepository.save(user);
    }

    async verifyOTP(email: string, otp: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        if (!user) return false;

        return user.resetOTP === otp && user.resetOTPExpiry > new Date();
    }

    async updatePassword(email: string, newPassword: string) {
        const user = await this.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const hashedPassword = crypto.createHash('sha512').update(newPassword).digest('hex');
        user.password = hashedPassword;
        user.resetOTP = null;
        user.resetOTPExpiry = null;
        await this.userRepository.save(user);
    }
}
