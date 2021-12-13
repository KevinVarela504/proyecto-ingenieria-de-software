import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Auth } from "../interfaces/auth";
import {User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl=environment.authUrl;
  registerUrl=environment.registerUrl;
  constructor(private httpClient:HttpClient) { }

  login(auth:Auth):Observable<any>{
    return this.httpClient.post<any>(this.authUrl,auth)
  }

  register(user:User):Observable<any>{
    return this.httpClient.post<any>(this.registerUrl,user)
  }
}
