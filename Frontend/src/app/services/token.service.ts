import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  constructor() { }

  setToken(token:string):void{
   localStorage.setItem('token',token)
  }

  getToken(){
   return  JSON.stringify(localStorage.getItem('token'));
  }

  logOut(): void {
    localStorage.clear();
  }

  getNombreUsuario(){
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.nombreUsuario;
    return nombreUsuario;
  }
}
