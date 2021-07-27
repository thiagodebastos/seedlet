import { User } from "../../domain/user"
import { IUserRepo, IUserSearchConfig } from "../IUserRepo"

export class SupabaseUserRepo implements IUserRepo {
  private supabaseModels: any

  constructor(supabaseModels: any) {
    this.supabaseModels = supabaseModels
  }

  exists(userId: string) {
    return Promise.resolve(true)
  }

  getUsers(config: IUserSearchConfig) {

    const users: User[] = []
    return Promise.resolve(users)
  }

  save(user: User) {
    return Promise.resolve(user)
  }
}
