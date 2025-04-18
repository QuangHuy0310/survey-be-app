import { registerAs } from "@nestjs/config";
import { configs } from "./config";

export default registerAs("googleOAuth", () => ({
    clientId: configs.googleClientId,
    clientSecret: configs.googleClientSecret,
    callbackURL: configs.googleCallBackURL
}))