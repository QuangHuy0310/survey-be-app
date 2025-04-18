import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { configs } from '@utils/config/config';
import googleOauthConfig from '@utils/config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from '@modules/users/user.service';
import { USER_ROLE } from '@utils/data-types/emuns';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject(googleOauthConfig.KEY) private googleConfiguration:
      ConfigType<typeof googleOauthConfig>
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

    const { id, emails, displayName } = profile;
    const user = {
      id,
      emails,
      name: displayName,
    };

    const isCheck = await this.userService.findByGoogleId(id)

    if (!isCheck) {
      const payload = await this.userService.create({
        googleId: user.id,
        email: user.emails[0].value,
        role: USER_ROLE.USER
      })
      
    }
    return done(null, user);

  }

}