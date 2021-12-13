import { Component, OnInit } from '@angular/core';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService} from "src/app/services/auth.service";
import { TokenService} from "src/app/services/token.service";


import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i')]),
    password_: new FormControl('',[Validators.required])
  });

  constructor(private router:Router, private authService:AuthService,private tokenService:TokenService,
    //private toaster:ToastrService
    ) { }

  ngOnInit(): void {
  }

 /* Onlogin():void{
    this.authService.login(this.loginForm.value).subscribe((res)=>{

      if(res){
        this.router.navigate([]);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN
      }
    })*/

     Onlogin():void{
      this.authService.login(this.loginForm.value).subscribe(data =>{
        console.log(data);
      if(!data.token){
/*           this.toaster.error(data.response.message,'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          }); */
      }else{
        this.tokenService.setToken(data);
      }

    }

    )}

}


