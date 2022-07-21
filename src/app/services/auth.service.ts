import { Injectable } from '@angular/core';
import { Api } from "./api.service";
import { UserResponse } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Api{

  public register(user) {
    return this.post<UserResponse>('/register', user)
  }
  public login(user) {
    return this.post<UserResponse>('/login', user)
  }
  public getProfile() {
    return this.get<UserResponse>('/profile')
  }
  public editProfile(user) {
    return this.put<UserResponse>('/profile/edit', user)
  }
}
