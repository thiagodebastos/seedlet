export interface IAuthService {
  isAuthenticated(): boolean;
}

export class AuthService implements IAuthService {
  isAuthenticated(): boolean {
    return true;
  }
}
