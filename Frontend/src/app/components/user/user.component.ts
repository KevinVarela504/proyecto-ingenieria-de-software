import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faBookOpen, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  faHome = faHome;
  faBook = faBookOpen;
  faStat = faChartBar;
  faBell = faBell;
  nameUser=this.generalUserService.getNombreUsuario();
  profilePhotoUser=this.generalUserService.getProfilePhoto();
  constructor(private generalUserService:GeneralUserService, private router:Router) { }

  ngOnInit(): void {
  }

  eliminarToken():void{
  this.generalUserService.logout();
  this.router.navigate(['inicio']); 
  }

}
