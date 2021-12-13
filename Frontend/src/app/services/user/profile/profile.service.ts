import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Auth,ForgotUser, UserResponse } from 'src/app/interfaces/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }

  getUser(email:String):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:3000/users/getUserInfo/${email}`);
   }

  updateUser(email:String, user:User):Observable<User>{
    return this.httpClient.put<User>(`http://localhost:3000/users/updateUserInfo/${email}`,user);
   }

  logout():void{
    localStorage.removeItem('token');
    localStorage.clear();
  }

  /*forgotPassword(forgotUser:ForgotUser): Observable<ForgotUser>{
    console.log("llegamos a la bd mandamos",forgotUser);
    return this.httpClient.post<ForgotUser>(`http://localhost:3000/auth/forgot`,forgotUser);
  }*/

  getToken():string{
  const userToken = JSON.stringify(localStorage.getItem('token'));
  return userToken;
  }

  isLogged(): boolean {
    if (!this.getToken()) {
      return false;
    }
    return true;
  }

  getNombreUsuario(): string {
    if (!this.isLogged()) {
      return 'user loco'
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.firstName;
    console.log("url del usuario",nombreUsuario);
    return nombreUsuario;
  }

  getProfilePhoto(): string {
    if (!this.isLogged()) {
      return 'usario no loggedo'
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    console.log("datos",valuesJson);
    var urlPhotoUser = valuesJson.urlPhoto;
    console.log("url del usuario",urlPhotoUser);
    return urlPhotoUser;
  }

  getEmail(): string {
    if (!this.isLogged()) {
      return 'user loco'
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const email = valuesJson.email;
    console.log("url del usuario",email);
    return email;
  }
}
