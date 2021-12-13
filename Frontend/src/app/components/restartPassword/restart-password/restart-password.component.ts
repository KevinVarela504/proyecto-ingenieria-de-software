import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit {

  constructor(private generalUserService:GeneralUserService,private router:Router) { }

  ngOnInit(): void {
  }

  restartPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)])
  });

  get emailLog(){
    return this.restartPasswordForm.get('email');
  }


  OnSendRestartPassword(): void {
      console.log("llego aqui");
      console.log(this.restartPasswordForm.value);
      this.generalUserService.forgotPassword(this.restartPasswordForm.value).subscribe(
        res =>  {console.log(res)},
        error => console.log(error)
      );
      this.router.navigate(['inicio']);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN

  }

  /*Onlogin():void{
    this.generalUserService.login(this.loginForm.value)
    .subscribe((res)=>{
      if(res){
        this.router.navigate(['usuario/eventos']);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN
        console.log(res);
      }
    },error=> alert(error.error.message));
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  OnRestartPassword() {
    this.generalUserService.forgotPassword(this.restartPasswordForm.value)
    
  }*/


}
