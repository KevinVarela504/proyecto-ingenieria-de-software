import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { passwordMatchValidator } from 'src/app/util/ValidadorEspecial';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
   private emailUser:string="";
   constructor(private generalUserService:GeneralUserService,private router:Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailUser = this.activatedRoute.snapshot.params.email;
    });

   }

  ngOnInit(): void {
  }

  restartPasswordForm = new FormGroup({
    password_: new FormControl('',Validators.required ),
  },);

  get passLog(){
    return this.restartPasswordForm.get('password_');
  }

  get repassLog(){
    return this.restartPasswordForm.get('repassword_');
  }

  OnRestartPassword() {
    console.log(this.restartPasswordForm.value);
    console.log("email del usuario sacado de la url",this.emailUser);
    console.log("parametros a enviar",this.emailUser);
    this.generalUserService.changePassword(this.emailUser,this.restartPasswordForm.value).subscribe(
      res =>  {console.log(res)},
      error => console.log(error)
    );
    this.router.navigate(['inicio']); 
  }
    
}
