import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { DatePipe } from '@angular/common';
import { ValidadoresEspeciales, dateValidator, hourValidator } from 'src/app/util/ValidadorEspecial';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import * as XLSX  from 'xlsx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faPlusCube = faPlus;
  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  mode: string = 'virtual';
  privacy: string = 'publico';
  typeEvent: string = 'conferencia';
  keyword: string = '';
  previsualizacion: string="";
  urlImage: string="";
  nameImage="";
  uploadPercent:Observable<number|undefined> | undefined;
  listUsersWhite!:string;


  eventosLista : Event[]=[]; 

  eventoForm = new FormGroup({
    photo : new FormControl(''),
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    openEvent:  new FormControl(true, [Validators.required]),
    institutionId: new FormControl(0,[Validators.required, Validators.min(0)]),
    listWhite : new FormControl(''),
  },{validators:dateValidator});


 

  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

  public fechaMinima: Date;
  public fechaStrMinima:string ;
  constructor(private eventServ: EventsService,
    private institutionServ: InstitutionService,
    private router: Router,
    private generalService: GeneralUserService,
    private pipe:DatePipe,
    private generalUserService:GeneralUserService,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage) {
      this.fechaMinima= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.fechaMinima, "yyyy-MM-dd")!;
     }

    ngOnInit(): void {
      
      this.getEvents();
      this.getInstitution();

    }

      extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try {
          const unsafeImg = window.URL.createObjectURL($event);
          const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
          const reader = new FileReader();
          reader.readAsDataURL($event);
          reader.onload = () => {
            resolve({
              base: reader.result
            });
          };
          reader.onerror = error => {
            resolve({
              base: null
            });
          };

        } catch (e) {
          throw null;
        }
      })

    capturarFile(event:any):any{
      const archivoCapturado=event.target.files[0];
      this.nameImage=archivoCapturado.name;
      this.upload(archivoCapturado);
    }

    capturarExcel(event:any){
      const selectedFile=event.target.files[0];
      const fileReader= new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload=(event:any)=>{
        console.log(event)
        let binaryData=event.target.result;
        let workbook=XLSX.read(binaryData,{type:'binary'});
        workbook.SheetNames.forEach(sheet=>{
          const data=XLSX.utils.sheet_to_json( workbook.Sheets[sheet]);
          const jsonExcel= JSON.stringify(data);
          this.listUsersWhite=jsonExcel;
        })
      }
    }

    upload(file:any){
     const filePath=`upload/${file.name}`;
     const ref=this.storage.ref(filePath);
     const task=this.storage.upload(filePath,file);
     this.uploadPercent=task.percentageChanges() ;
     task.snapshotChanges().pipe(finalize(()=>{ref.getDownloadURL().subscribe(url=>{
       this.urlImage=url;
       console.log(url)
       console.log(this.urlImage);
     })})).subscribe();
    }

get photo (){
  return this.eventoForm.get('photo');
}
get name(){
  return this.eventoForm.get('name');
}
get description_(){
  return this.eventoForm.get('description_');
}
get startDate(){
  return this.eventoForm.get('startDate');
}
get endDate(){
  return this.eventoForm.get('endDate');
}
get places(){
  return this.eventoForm.get('places');
}
get openEvent(){
  return this.eventoForm.get('openEvent');
}
get institutionId(){
  return this.eventoForm.get('institutionId');
}


  createEvents(){
    this.eventoForm.value.institutionId=Number(this.eventoForm.value.institutionId)
    this.eventoForm.value.photo=this.urlImage;
    this.eventoForm.value.listWhite=this.listUsersWhite;
    this.eventServ.createEvent(this.eventoForm.value,this.generalService.getEmail()).subscribe(
      res =>  {console.log(res)},
      error => console.log(error))
    this.router.initialNavigation();
    window.location.reload();
  }

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)
    )
  }

  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {this.institutions=res},
      error => console.log(error)


    )
  }

  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }

  viewEvent(id: number, idUser: string) {
    let usuarioId = this.generalUserService.getEmail();
    if (idUser==usuarioId) {
      this.router.navigate(['usuario/mi-evento/'+id]);
    } else {
      this.router.navigate(['usuario/evento/'+id]);  
    }
    
  }


  
}
