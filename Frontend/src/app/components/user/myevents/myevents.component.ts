import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { Event } from "../../../interfaces/event";
import { Router } from '@angular/router';


@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  keyword: string = '';

  eventosLista : Event[]=[];

  
  constructor(
    private generalUserService:GeneralUserService,
    private eventServ:EventsService,
    private router: Router,) { }
    
  ngOnInit(): void {
    
    let usuarioId= this.generalUserService.getEmail();
    this.getEventsForUser(usuarioId);
  }


  getEventsForUser(usuarioId:string){
    this.eventServ.getEventsForUser(usuarioId).subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  viewMyEvent(id: number) {
    this.router.navigate(['usuario/mi-evento/'+id]);
  }
}
