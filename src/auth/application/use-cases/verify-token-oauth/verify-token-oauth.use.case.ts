import { HttpStatus } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';

@Injectable()
export class VerifyTokenOAuthUseCase {
  async execute(token: string) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (payload === undefined) {
      throw new CustomError(
        ErrorCode.token_oauth_not_exist,
        'OAuth token not exist',
        HttpStatus.NOT_FOUND,
        VerifyTokenOAuthUseCase.name,
      );
    }

    const userId = payload['sub'];

    return payload;
  }
}
