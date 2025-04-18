import { ResponseUserSchema } from '@entities/response-user.entities';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Response.name, schema: ResponseUserSchema },
        ]),
    ],
    controllers: [
        ResponseController, ],
    providers: [
        ResponseService, ],
})
export class ResponseModule {}
