import { faBookmark, faCamera, faLock, faPlus, faPlusCircle, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  display: string = 'none';
  faCamera = faCamera;
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
  readonly: Boolean = true;

  //Para recorrer y llenar el select-list de instituciones
  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

  
updateUserForm = new FormGroup({
  //email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
  firstName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  middleName  : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  lastName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  secondLastName: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  academicTraining: new FormControl('',[Validators.required]),
  description_ : new FormControl('',[Validators.required]),
  interests : new FormControl('',[Validators.required]),
  institutionRepresenting :new FormControl(0,[Validators.required, Validators.min(0)]),
  profilePhoto : new FormControl('')
},{validators:passwordMatchValidator});

constructor( private eventServ: EventsService,
  private generalUserService:GeneralUserService,
  private institutionServ:InstitutionService,
  private router:Router,
  private storage: AngularFireStorage,
  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getInstitution();
    this.getAllUsers();
    this.getAllInfo();
  }

  getAllInfo(){
    this.generalUserService.getUser(this.generalUserService.getEmail()).subscribe(
      res =>  {
        console.log(res);
        this.readOnlyAll();
        this.profilePhotoUser = this.generalUserService.getProfilePhoto();
        Object.values(res).map((value, index) => {
            
            /*
            if(index==0){
                this.updateUserForm.controls['email'].setValue(value);
            }
            */
            if(index==4){
              this.updateUserForm.controls['firstName'].setValue(value);
            }
            if(index==5){
              this.updateUserForm.controls['middleName'].setValue(value);
            }
            if(index==7){
              this.updateUserForm.controls['lastName'].setValue(value);
            }
            if(index==8){
              this.updateUserForm.controls['secondLastName'].setValue(value);
            }
            if(index==10){
              this.updateUserForm.controls['institutionRepresenting'].setValue(value); 
            }
            if(index==2){
              this.updateUserForm.controls['academicTraining'].setValue(value);
            }
            if(index==3){
              this.updateUserForm.controls['description_'].setValue(value);
            }
            if(index==6){
              this.updateUserForm.controls['interests'].setValue(value);
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
    $('#faperfil').css({"visibility": "hidden"});
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
        this.profilePhotoUser = reader.result;
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

//Getters de los formControls de FormGroup updateUserForm para utilizar validaciones
  
/*
get email() {
    return this.updateUserForm.get('email');
  }
*/

  get firstName() {
    return this.updateUserForm.get('firstName');
  }

  get middleName() {
    return this.updateUserForm.get('middleName');
  }


  get lastName() {
    return this.updateUserForm.get('lastName');
  }

  get secondLastName(){
    return this.updateUserForm.get('secondLastName');
  }

  get academicTraining(){
    return this.updateUserForm.get('academicTraining');
  }
   get description_(){
     return this.updateUserForm.get('description_');
   }
  get interests(){
    return this.updateUserForm.get('interests');
  }

  get institutionRepresenting(){
    return this.updateUserForm.get('institutionRepresenting');
  }

  get profilePhoto (){
    return this.updateUserForm.get('profilePhoto');
  }

  getAllUsers(){
    this.generalUserService.getUsers().subscribe(
      res =>  {console.log(res)},
      error => console.log(error)
    )
  }

  EditUser(){
    // Ocultar el botón editar
    $('#editBtn').hide();

    // Mostar el botón Guardar cambios
    $('#saveBtn').show();
    
    // Hacer editable todos los campos
    $('#institutionSelect').prop('disabled', false);
    $('#firstName').prop('readonly', false);
    $('#middleName').prop('readonly', false);
    $('#lastName').prop('readonly', false);
    $('#secondLastName').prop('readonly', false);
    $('#academicTraining').prop('readonly', false);
    $('#description_').prop('readonly', false);
    $('#interests').prop('readonly', false);
    $('#institutionRepresenting').prop('readonly', false);
    $('#faperfil').css({"visibility": "visible"});
    //$('#email').prop('readonly', false);
  }

  editableAll(){
  
  }

  UpdateUser(){
    this.readOnlyAll();
    $('#editBtn').show();
    $('#saveBtn').hide();
    const institutionId = this.updateUserForm.value.institutionRepresenting;
    /*
    this.generalUserService.updateUser(this.updateUserForm.value).subscribe(
      res =>  {
        this.generalUserService.setUser(res);
        this.router.navigate(['/user/profile']);
      },
      error => console.log(error)
    )
    */
    // Sino se selecciono institución obtener el nombre de la nueva institucion
    // console.log(this.updateUserForm.value);
    this.updateUserForm.value.institutionRepresenting = String(this.updateUserForm.value.institutionRepresenting);
    if(this.urlImage.length > 0){
      this.updateUserForm.value.profilePhoto=this.urlImage;
    }else{
      this.updateUserForm.value.profilePhoto=this.profilePhotoUser;
    }

    this.generalUserService.updateUser(this.generalUserService.getEmail(), this.updateUserForm.value).subscribe(
      res => {
        console.log(res);
        alert('Usuario actualizado correctamente. Debe volver a iniciar sesión para que los cambios surtan efecto.');
        this.router.navigate(['/inicio']);
      },
      err =>console.log(err)
    )}
}
