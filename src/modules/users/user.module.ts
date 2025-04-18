import { UserService } from '@modules/users/user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@entities/user.entities';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [
        UserService,
    ],
    exports: [UserService],
})
export class UserModule { }
