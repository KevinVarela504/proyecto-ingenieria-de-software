import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { param } from 'jquery';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';
import { EventsService } from 'src/app/services/user/events/events.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { InstitutionService  } from "../../../services/institutions/institutions.service";
import {Inscription } from 'src/app/interfaces/inscription';
import { CheckInService } from 'src/app/services/check in/check-in.service';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageEvent } from 'src/app/interfaces/ImageEvent';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {


  faPlus = faPlusCircle;
  faTrash = faTrash;
  faAsterisk = faCertificate;
  devolver=false;
  urls: any = [];
  event: any = {
    name: '',
    startDate: '',
    endDate: '',
    places :'',
    modality:'',
    statusId:'',
    institutionId: '',
    description_: '',
    userId: '',
    startTime: '',
    endTime: '',
    image: ''
  };

  urlImage: string="";
  nameImage="";
  uploadPercent:Observable<number|undefined> | undefined;
  inscriptions:Inscription[]=[];
  imagesEvent: ImageEvent[]=[];

  eventosProgramados: ScheduledEvent[]=[]

  inst: any ={
    institutionId:0,
    name:''
  }
  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private schEvent: ScheduledEventService,
     private insc: CheckInService,
     private generalUserService:GeneralUserService,
     private router: Router,
     private pipe:DatePipe,
     private storage: AngularFireStorage
     ) {this.getInscriptions()}

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
    this.getAllScheduledEvents(params.name);
/*     this.getInscriptions(); */
  }

  printPDF() {
    var win = window.open('', '_blank', 'width=600px');
    win?.document.write(`
    <!doctype html>
    <html lang="en">
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <style>
  @media print {
    @page { margin: 0; }
    body { margin: 1.6cm; }
  }
  </style>
    </head>
    <body>
    <div class="container">
  <div class="row mb-3">
    <img style="height: 50vh;" src='` + this.event.photo + `' alt="">
  </div>
  <div class="d-flex mb-3">
    <div>Fecha de inicio: <label for="" class="mx-2">` + this.pipe.transform(this.event.startDate, 'dd-MM-yyyy')+ `</label></div>
    <div>Fecha de finalización: <label for="" class="mx-2">` +  this.pipe.transform(this.event.endDate, 'dd-MM-yyyy') + `</label></div>
  </div>
  <div class="row mb-3">
    <div>Institución: <label for="" class="mx-2">` + this.event.institutionId + `</label></div>
    <div>Descripción: ` + this.event.description_ + `</div>
  </div>
  <div class="row mb-3">
    <div class="mb-2">Organizador:</div>
    <div class="d-flex align-items-center">
      <div class="sm-avatar mx-2"></div>
      <div class="cp">` + this.event.userId + `</div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="row mb-3">
    <div class="row my-3">Agenda</div>`);

    // *ngFor="let evento of eventosProgramados; let i = index"
for (let i = 0; i < this.eventosProgramados.length; i++) {
  win?.document.write(`
    <div class="row mb-3 py-2" style="background-color: #d5caca82; border-radius: 5px;">
      <div class="col-lg-3 col-md-3 col-sm-12 col-12">
        <div class="d-flex justify-content-between"><div>Fecha de inicio:</div> <div>` + this.pipe.transform(this.eventosProgramados[i].startDate, 'dd-MM-yyyy') + `</div></div>
        <div class="d-flex justify-content-between"><div>Fecha de fin:</div> <div>` + this.pipe.transform(this.eventosProgramados[i].endDate, 'dd-MM-yyyy') + `</div></div>
         <div class="d-flex justify-content-between"><div>Hora de inicio:</div> <div>` + this.pipe.transform(this.eventosProgramados[i].startHour, 'HH:mm a') + `</div></div>
        <div class="d-flex justify-content-between"><div>Hora de fin:</div> <div>` + this.pipe.transform(this.eventosProgramados[i].endHour, 'HH:mm a') + `</div></div>
      </div>
      <div class="col-lg-9 col-md-9 col-sm-12 col-12" style="border-left: solid 2px gray;">
        <div class="title-conference">` + this.eventosProgramados[i].name + `</div>
        <div class="ml-5">Descripción: ` + this.eventosProgramados[i].description_ + `</div>
        <div class="ml-5">` + this.eventosProgramados[i].address + `</div>
        <div class="row mb-3" >
          <div class="d-flex align-items-center justify-content-center">
            <div class="sm-avatar"></div>
            <div class="mx-2 cp">` + this.eventosProgramados[i].managerId + `</div>
          </div>
        </div>

      </div>
    </div>`);
}
  win?.document.write(`</div>
</div>
</body>
</html>
    `);
    win?.document.close();
    win?.addEventListener('load', () => {
      win?.print();
    });
    // win?.close();
  }

  getEvent(id:number){

    this.eventServ.getEvent(id).subscribe(
      res =>  {
        this.event=res;
        console.log(this.event);
        this.getIimageByEvent(id, this.event.photo);
        this.institutionService.getInstitution(this.event.institutionId).subscribe(
          res =>  {this.event.institutionId=res.name},
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  getIimageByEvent(id:number, photo?: string){
    this.eventServ.getImageByEvent(id).subscribe(
     res=>{
       this.imagesEvent=res;
       if (photo != undefined) {
         this.imagesEvent.push({'URL': photo, imageId: 0, eventId: 0});
       }
       console.log(res)
     },
     error=>console.log(error)
     )
   }

  uploadImage(inputname: string) {
    const id = Math.random().toString(36).substring(2);
    var input: any = document.getElementById(inputname);
    const file = input.files[0];
    const ruta = `upload/${id}`;
    const ref = this.storage.ref(ruta);

    const carga = this.storage.upload(ruta, file);
    this.uploadPercent = carga.percentageChanges();
    carga.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.urlImage=url;
          //Aqui deben mandar a guardar la url
          console.log(url)
          console.log(this.urlImage);
        });
      })
    ).subscribe();
   }


  getAllScheduledEvents(idEvent:number){
    this.schEvent.getAllScheduledEventsWhere(idEvent).subscribe(
      res =>  {
      this.eventosProgramados=res},
      error => console.log(error)
    )
  }
  goToProfile(id: String) {
    this.router.navigate(['/usuario/perfil-publico/'+ id]);
  }

  //Métodos de Inscripción
  createInscription(scheduledEventId: number){
    let inscription ={
      idScheduledEvent:scheduledEventId,
      idUser:this.generalUserService.getEmail(),
      nameUser:this.generalUserService.getNombreUsuario(),
    }

    this.insc.createInscription(inscription).subscribe(
       res =>  {alert(res.message)},
      error=> alert(error.error.message)
      )
  }

  deleteInscription(idScheduledEventF:number){
    this.insc.deleteInscription(idScheduledEventF,this.generalUserService.getEmail()).subscribe(
       res =>  {alert(res.message)},
      error=> alert(error.error.message)
    )
  }

  /*getOneInscription(){
    this.insc.getOneInscription().subscribe(
      res =>  {this.inscript=res},
      error=> alert(error.error.message)
    )
  }*/

  getInscriptions(){
    this.insc.getInscriptions().subscribe(
      res =>  {this.inscriptions=res,console.log(res)},
      error=> alert(error.error.message)
    )
  }

  getExist(idSheduleEvent:number){
    console.log("id de evento y email",idSheduleEvent,this.generalUserService.getEmail());
    this.inscriptions.forEach(element=>{
      if(element.idScheduledEvent==idSheduleEvent && element.idUser==this.generalUserService.getEmail()){
        console.log("coincidio");
        this.devolver=true;
      }
    })
    return this.devolver;
  }



}
