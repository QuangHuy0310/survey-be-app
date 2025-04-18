import { JwtModuleOptions } from "@nestjs/jwt";
import { configs } from "./config";
import { registerAs } from '@nestjs/config'


export default registerAs("jwt", (): JwtModuleOptions => ({
    secret: configs.jwt,
    signOptions: {
        expiresIn: '1d'
    }
}))