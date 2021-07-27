import { User } from "../domain/user";

export interface IUserSearchConfig {
  email: string;
  limit?: number;
}

export interface IUserRepo {
  exists(userId: string): Promise<boolean>
  getUsers(config: IUserSearchConfig): Promise<User[]>
  save(user: User): Promise<User>
}
