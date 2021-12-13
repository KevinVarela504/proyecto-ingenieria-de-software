import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { Event } from 'src/app/interfaces/event';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';
import { param } from 'jquery';
import { Inscription } from 'src/app/interfaces/inscription';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageEvent } from 'src/app/interfaces/ImageEvent';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.scss']
})
export class MyeventComponent implements OnInit {

  faPlus = faPlusCircle;
  faEye = faEye;
  faAsterisk = faCertificate;
  faTrash = faTrash;
  public fechaMinima: Date;
  public fechaStrMinima:string ;
  mode: string = 'virtual';
  typeEvent: string = 'conferencia';
  privacy: string = 'publico';
  eventName: String = '';
  certificatedSheduleEvent:Inscription[]=[];
  urls: any = [];
  urlImage: string="";
  nameImage="";
  uploadPercent:Observable<number|undefined> | undefined;

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
    startHour: '',
    endHour: '',
    image: ''
  };

  imagesEvent: ImageEvent[]=[] //este arreglo es el de las imagenes de cada evento MARYA PILAS CHAVALA


  eventosProgramados: ScheduledEvent[]=[{
    scheduledEventId: 0,
    name:'',
    description_: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: 0,
    modality:'',
    statusId:0,
    managerId:'',
    eventId:0,
    address: ''
   }
  ];

  participants: any = [];

  inst: any ={
    institutionId:0,
    name:''
  }


  eventoProgramadoForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    startHour: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
    places:  new FormControl(undefined, [ Validators.min(1)]),
    modality: new FormControl('', Validators.required),
    managerId: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    address: new FormControl('',Validators.required),
    eventId:new FormControl(0)
  },{validators:dateValidator } )


  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private pipe:DatePipe,
     private schEvent : ScheduledEventService,
     private router: Router,
     private storage: AngularFireStorage ) {

      this.fechaMinima= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.fechaMinima, "yyyy-MM-dd")!;
     }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.eventName = params.name;
      this.getEvent(params.name);
    }
    this.getAllScheduledEvents(params.name);
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
          this.eventServ.addImageEvent(Number(this.activatedRoute.snapshot.params.name),url).subscribe(
            res=>console.log(res),
            error=>console.log(error)
          )
          console.log(Number(this.activatedRoute.snapshot.params.name),url)
          console.log(url)
          console.log(this.urlImage);
        });
      })
    ).subscribe();
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


  get name(){
    return this.eventoProgramadoForm.get('name');
  }
  get description_(){
    return this.eventoProgramadoForm.get('description_');
  }

  get startDate(){
    return this.eventoProgramadoForm.get('startDate');
  }

  get endDate(){
    return this.eventoProgramadoForm.get('endDate');
  }

  get startHour(){
    return this.eventoProgramadoForm.get('startHour');
  }

  get endHour(){
    return this.eventoProgramadoForm.get('endHour');
  }

  get places(){
    return this.eventoProgramadoForm.get('places');
  }

  get modality(){
    return this.eventoProgramadoForm.get('modality');
  }

  get managerId(){
    return this.eventoProgramadoForm.get('managerId');
  }

  get address(){
    return this.eventoProgramadoForm.get('address');
  }






  deleteEvent(idEvento:number){
    this.eventServ.deleteEvent(idEvento).subscribe(
      res=>{
        console.log(res);

      },
      error=> console.log(error)

    )
    this.router.navigate(['usuario/mis-eventos']);
  }

  getEvent(id:number){

    this.eventServ.getEvent(id).subscribe(
      res =>  {
        this.event=res;
        console.log(this.event);
        this.getIimageByEvent(id, this.event.photo);
        // this.urls.push(this.event.photo);
        this.institutionService.getInstitution(this.event.institutionId).subscribe(
          res =>  {
            this.event.institutionId=res.name
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }


  createScheduledEvent(){
/*     console.log("crear evento programado",this.eventoProgramadoForm.value) */
    this.eventoProgramadoForm.value.eventId=Number(this.activatedRoute.snapshot.params.name)
/*     console.log( "hora inicio: ",this.eventoProgramadoForm.value.startHour)
    console.log( "hora final: ",this.eventoProgramadoForm.value.endHour) */
    this.eventoProgramadoForm.value.startHour=this.eventoProgramadoForm.value.startDate+' '+this.eventoProgramadoForm.value.startHour
    this.eventoProgramadoForm.value.endHour=this.eventoProgramadoForm.value.endDate+' '+this.eventoProgramadoForm.value.endHour
    this.schEvent.createScheduledEvent(this.eventoProgramadoForm.value).subscribe(
      res =>  {alert(res.message)},
      error=> alert(error.error.message))
      window.location.reload();
  }


  getAllScheduledEvents(idEvent:number){
    this.schEvent.getAllScheduledEventsWhere(idEvent).subscribe(
      res =>  {this.eventosProgramados=res},
      error => console.log(error)
    )
  }


  getAllDataCertifications(idSheduleEvent:number,name:string){
    this.schEvent.getScheduledEventCertificate(idSheduleEvent).subscribe(
      res => {this.certificatedSheduleEvent=res;
        var win = window.open('', '_blank', 'width=600px');
    win?.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <style>
        @media print {
          @page { margin: 0; size: landscape !important; }
          body { margin: 1.6cm; }
        }

        html {
          height: 100%;
          width: 100%;
        }

        div {
          width: 100%;
        }

        .diploma {
          position: relative;
          height: 740px;
          width: 902px;
          box-sizing: border-box;
          padding: 1rem;
          page-break-after: always;
          page-break-before: always;
        }

        .diploma img {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: fit-content;
        }

        .diploma-content {
          z-index: 10;
          position: absolute;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        </style>
      </head>
      <body>
      `);

      res.forEach(resp=>{
        win?.document.write(`
        <div class="diploma">
          <img src='https://firebasestorage.googleapis.com/v0/b/industria-project.appspot.com/o/certificado_base.png?alt=media&token=a33c6e7f-5b1a-4469-a0bc-e8f4cd49e823'>
          <div class="diploma-content">
            <div><h2>Certificado de Participación</h2></div>
            <div>
              <div>Este certificado acredita que</div>
              <div><h1><i>`+ resp.nameUser +`</i></h1></div>
              <div>ha participado en La conferencia `+ name+`</div>
            </div>
            <div>
              img de firma
            </div>
          </div>
        </div>
      `);
    })
    win?.document.write(`
      </body>
    </html>
    `);
    win?.document.close();
    win?.addEventListener('load', () => {
      win?.print();
    });},
      error => console.log(error)
    )
  }


  deleteScheduledEvent(idEvento:number){
    this.schEvent.deleteScheduledEvent(idEvento).subscribe(
      res=>{
        console.log(res);
        this.getAllScheduledEvents(this.activatedRoute.snapshot.params.name);

      },
      error=> console.log(error)

    )

  }

  createEvents() {
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }

  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  goToParticipants(idScheduledEventF:number) {
    this.router.navigate(['/usuario/mi-evento/'+ this.eventName +'/participants/'+ idScheduledEventF]);
  }

  goToProfile(id: String) {
    this.router.navigate(['/usuario/perfil-publico/'+ id]);
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
    @page { margin: 0; size: landscape; }
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

  generateDiploma() {
    var win = window.open('', '_blank', 'width=600px');
    win?.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <style>
        @media print {
          @page { margin: 0; size: landscape; }
          body { margin: 1.6cm; }
        }

        html {
          height: 100%;
          width: 100%;
        }

        div {
          width: 100%;
        }

        .diploma {
          position: relative;
          height: 740px;
          width: 902px;
          box-sizing: border-box;
          padding: 1rem;
          page-break-after: always;
        }

        .diploma img {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: fit-content;
        }

        .diploma-content {
          z-index: 10;
          position: absolute;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        </style>
      </head>
      <body>
      `);
      let limite = this.participants.length(); //sustituir el valor 10 por el tamaño del arreglo que contiene los nombres
      for(let i = 0; i < limite; i++) {
        win?.document.write(`
        <div class="diploma">
          <img src='https://firebasestorage.googleapis.com/v0/b/industria-project.appspot.com/o/certificado_base.png?alt=media&token=a33c6e7f-5b1a-4469-a0bc-e8f4cd49e823'>
          <div class="diploma-content">
            <div><h2>Certificado de Participación</h2></div>

            <div>
              <div>Este certificado acredita que</div>
              <div><h1><i>`+ this.participants[i] +`</i></h1></div>
              <div>ha participado en "La conferencia de prueba"</div>
            </div>

            <div>
              img de firma
            </div>
          </div>
        </div>
      `);
      }
    win?.document.write(`
      </body>
    </html>
    `);
    win?.document.close();
    win?.addEventListener('load', () => {
      win?.print();
    });
  }

}
