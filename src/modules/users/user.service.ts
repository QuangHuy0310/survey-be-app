import { User } from '@entities/user.entities';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(data: Partial<User>): Promise<User> {
         (data)
        const user = await this.userModel.create(data);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async findByGoogleId(id: string): Promise<User> {
        const user = await this.userModel.findOne({ googleId: id }).exec();
         (user)
        return user;
    }

    async findById(id: string): Promise<User> {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}   