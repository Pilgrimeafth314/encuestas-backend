import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

export interface IUseToken {
  hd: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  is_expired: boolean;
  is_student: boolean;
}

export const useToken = async (token: string): Promise<string | IUseToken> => {
  try {
    const decode = (
      await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
    ).getPayload();

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    const coincidence = decode.email?.match(/za?(\d+)/g);

    return {
      hd: decode.hd,
      email: decode.email,
      name: decode.name,
      picture: decode.profile,
      given_name: decode.profile,
      family_name: decode.family_name,
      is_expired: +expiresDate <= +currentDate / 1000,
      is_student: coincidence !== null,
    };
  } catch (e) {
    return 'Token Invalido'
  }
};
