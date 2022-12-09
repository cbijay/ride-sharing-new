import { CredentialResponse } from "@react-oauth/google";
import { IResponse } from "core/types/global/IResponse";

export interface IAuthResponse extends IResponse {
  accessToken: string;
}

export interface ILogin {
  credential?: CredentialResponse["credential"];
}

export interface ISignup extends ILogin {
  lat?: number;
  long?: number;
}
