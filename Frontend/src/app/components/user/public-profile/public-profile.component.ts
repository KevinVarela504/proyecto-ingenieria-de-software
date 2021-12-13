import { Component, OnInit } from '@angular/core';
import { faBookmark, faCamera, faLock, faPlus, faPlusCircle, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
//import { ProfileService } from 'src/app/services/user/profile/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { passwordMatchValidator } from 'src/app/util/ValidadorEspecial';
import { AngularFireStorage} from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})

export class PublicProfileComponent implements OnInit {

  display: string = 'none';
  faCamera = faCamera;
  imgPerfil: any;
  faPlusCube = faPlus;
  faPencil = faPencilAlt;
  faSave = faSave;
  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  mode: string = 'virtual';
  privacy: string = 'publico';
  keyword: string = ''; 
  previsualizacion: string="";
  urlImage: string="";
  nameImage="";
  profilePhotoUser: any;

  //Para recorrer y llenar el select-list de instituciones
  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

  
managerInfoForm = new FormGroup({
  //email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
  firstName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  academicTraining: new FormControl('',[Validators.required]),
  description_ : new FormControl('',[Validators.required]),
  interests : new FormControl('',[Validators.required]),
  institutionRepresenting :new FormControl(0,[Validators.required, Validators.min(0)]),
  profilePhoto : new FormControl('')
},{validators:passwordMatchValidator});

constructor( private eventServ: EventsService,
  //private profileUserService:ProfileService,
  private generalUserService:GeneralUserService,
  private institutionServ:InstitutionService,
  private router:Router,
  private storage: AngularFireStorage,
  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getInstitution();
    //this.getAllUsers();
    this.getAllInfo();
  }

  getAllInfo(){
    const lastUrlSegment = this.router.url.split('?')[0].split('/').pop()
    this.generalUserService.getUser(String(lastUrlSegment)).subscribe(
      res =>  {
        console.log(res);
        this.readOnlyAll();
        this.profilePhotoUser = this.generalUserService.getProfilePhoto();
        var completeName = "";
        Object.values(res).map((value, index) => {
            
            /*
            if(index==0){
                this.managerInfoForm.controls['email'].setValue(value);
            }
            */
            if(index==4){
              completeName = value
              //this.managerInfoForm.controls['firstName'].setValue(value);
            }
            if(index==5){
              completeName = completeName +" "+ value;
              //this.managerInfoForm.controls['middleName'].setValue(value);
            }
            if(index==7){
              completeName = completeName+" "+ value
              //this.managerInfoForm.controls['lastName'].setValue(value);
            }
            if(index==8){
              completeName = completeName+" "+ value
              this.managerInfoForm.controls['firstName'].setValue(completeName);
            }
            if(index==10){
              this.managerInfoForm.controls['institutionRepresenting'].setValue(value); 
            }
            if(index==2){
              this.managerInfoForm.controls['academicTraining'].setValue(value);
            }
            if(index==3){
              this.managerInfoForm.controls['description_'].setValue(value);
            }
            if(index==6){
              this.managerInfoForm.controls['interests'].setValue(value);
            }    
            if(index==9){
              this.profilePhotoUser = value;
            }
        });
      },
      error => console.log(error)
    )
  } 
  
  readOnlyAll(){
    // Ocultar el botón de salvar cambios
    $('#saveBtn').hide();
    // Hacer readonly todos los campos
    $('#institutionSelect').prop('disabled', true);
    $('#firstName').prop('readonly', true);
    $('#middleName').prop('readonly', true);
    $('#lastName').prop('readonly', true);
    $('#secondLastName').prop('readonly', true);
    $('#academicTraining').prop('readonly', true);
    $('#description_').prop('readonly', true);
    $('#interests').prop('readonly', true);
    $('#institutionRepresenting').prop('readonly', true);
    //$('#email').prop('readonly', true);
  }

  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {
        this.institutions=res;
      },
      error => console.log(error)

    )
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

  cambiarImagen(event:any):any{
    const archivoCapturado=event.target.files[0];
    this.nameImage=archivoCapturado.name;
    this.upload(archivoCapturado);

    let img = (document.getElementById('perfil')) as HTMLInputElement;
    if (img.files!.length>0){
      var reader = new FileReader();
      reader.onload = () => {
        this.imgPerfil = reader.result;
      };
      reader.readAsDataURL(img.files![0]);
      // this.imgPerfil = URL.createObjectURL(img.files![0]);
    }
  }

  upload(file:any){
    const filePath=`upload/${file.name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file)
    task.snapshotChanges().pipe(finalize(()=>{ref.getDownloadURL().subscribe(url=>{
      this.urlImage=url;
      //console.log(url)
      //console.log(this.urlImage);
    })})).subscribe();
   }

//Getters de los formControls de FormGroup managerInfoForm para utilizar validaciones
  
/*
get email() {
    return this.managerInfoForm.get('email');
  }
*/

  get firstName() {
    return this.managerInfoForm.get('firstName');
  }

  get middleName() {
    return this.managerInfoForm.get('middleName');
  }


  get lastName() {
    return this.managerInfoForm.get('lastName');
  }

  get secondLastName(){
    return this.managerInfoForm.get('secondLastName');
  }

  get academicTraining(){
    return this.managerInfoForm.get('academicTraining');
  }
   get description_(){
     return this.managerInfoForm.get('description_');
   }
  get interests(){
    return this.managerInfoForm.get('interests');
  }

  get institutionRepresenting(){
    return this.managerInfoForm.get('institutionRepresenting');
  }

  get profilePhoto (){
    return this.managerInfoForm.get('profilePhoto');
  }

}