import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { faBookmark, faCamera, faLock } from '@fortawesome/free-solid-svg-icons';
import { passwordMatchValidator } from 'src/app/util/ValidadorEspecial';
import { AngularFireStorage} from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  display: string = 'none';
  faBookmark = faBookmark;
  faLock = faLock;
  keyword: string = '';
  nameImage="";
  urlImage: string="";



 eventosLista : Event[]=[]; //Arreglo de eventos para recorrer y pintar el html con NGFOR
  faCamera = faCamera;
  imgPerfil: any;


  //Para recorrer y llenar el select-list de instituciones
  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

registerForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
  firstName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  password_: new FormControl('',[Validators.required, Validators.minLength(5)]),
  repassword_: new FormControl('',[Validators.required, Validators.minLength(5)]),
  middleName  : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  lastName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  secondLastName: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  academicTraining: new FormControl('',[Validators.required]),
  description_ : new FormControl('',[Validators.required]),
  interests : new FormControl('',[Validators.required]),
  institutionRepresenting :new FormControl(0,[Validators.required, Validators.min(0)]),
  profilePhoto : new FormControl('')
},{validators:passwordMatchValidator});

institutionForm = new FormGroup({
  name : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
});

loginForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),

  password_: new FormControl('',[Validators.required, Validators.minLength(5)])
});

  constructor( private eventServ: EventsService,
    private generalUserService:GeneralUserService,
    private institutionServ:InstitutionService, private router:Router,
    private storage: AngularFireStorage,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getInstitution();
    this.getEvents();
    this.getAllUsers();
    this.readOnlyAll();
  }

  editAll(){
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
    $('#institutionForm').prop('readonly', false);
    $('#faperfil').css({"visibility": "visible"});
    $('#email').prop('readonly', false);
    $('#password').prop('readonly', false);
    $('#repassword_').prop('readonly', false);
  }

  readOnlyAll(){
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
    $('#institutionForm').prop('readonly', true);
    $('#faperfil').css({"visibility": "hidden"});
    $('#email').prop('readonly', true);
    $('#password').prop('readonly', true);
    $('#repassword_').prop('readonly', true);
  }


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
    this.editAll();
  }

  upload(file:any){
    const filePath=`uploadUser/${file.name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file)
    task.snapshotChanges().pipe(finalize(()=>{ref.getDownloadURL().subscribe(url=>{
      this.urlImage=url;
    })})).subscribe();
   }

  //Getters de los formControls de FormGroup loginForm para utilizar validaciones
  get emailLog(){
    return this.loginForm.get('email');
  }


  get passLog(){
    return this.loginForm.get('password_');
  }



//Getters de los formControls de FormGroup registerForm para utilizar validaciones
  get email() {
    return this.registerForm.get('email');
  }


  get firstName() {
    return this.registerForm.get('firstName');
  }

  get middleName() {
    return this.registerForm.get('middleName');
  }


  get lastName() {
    return this.registerForm.get('lastName');
  }

  get secondLastName(){
    return this.registerForm.get('secondLastName');
  }

  get academicTraining(){
    return this.registerForm.get('academicTraining');
  }
   get description_(){
     return this.registerForm.get('description_');
   }
  get interests(){
    return this.registerForm.get('interests');
  }

  get institutionRepresenting(){
    return this.registerForm.get('institutionRepresenting');
  }


  get passReg(){
    return this.registerForm.get('password_');
  }

  get repassReg(){
    return this.registerForm.get('repassword_');
  }

  get profilePhoto (){
    return this.registerForm.get('profilePhoto');
  }

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  getAllUsers(){
    this.generalUserService.getUsers().subscribe(
      res =>  {
        // console.log(res)
      },
      error => console.log(error)

    )
  }

  getFilterEvents(typeFilter: string) {
    this.eventServ.getFilterEvents(typeFilter, this.keyword).subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  CreateUser() {
    console.log(this.registerForm.valid);
    console.log(this.registerForm.controls);
    const institutionId = this.registerForm.value.institutionRepresenting;

    // Sino se selecciono institución obtener el nombre de la nueva institucion
    if (this.registerForm.get('repassword_')?.value == this.registerForm.get('password_')?.value) {
      console.log('instituto', institutionId);
      if(institutionId == 0){
        this.institutionServ.createInstitution(this.institutionForm.value).subscribe(
          res => {
            console.log('2', res);
            this.registerForm.value.institutionRepresenting = res.InstitutionID;
            this.registerForm.get('repassword_')?.disable();
            this.registerForm.value.profilePhoto=this.urlImage;
            this.generalUserService.createUser(this.registerForm.value).subscribe(
              res => {
                console.log('3', res);
                for (const key in res){
                  if (key == 'error-001'){
                    alert('El correo ya esta registrado');
                  }
                }
                // console.log(res);
              },
              err =>console.log(err)
            )
          },
          err =>console.log('No se intento crear una institucion')
        )

      }else{
        this.registerForm.value.institutionRepresenting = Number(this.registerForm.value.institutionRepresenting);
        this.registerForm.get('repassword_')?.disable();
        this.registerForm.value.profilePhoto=this.urlImage;
        this.generalUserService.createUser(this.registerForm.value).subscribe(
          res => {
            console.log(res);
          },
          err =>console.log(err)
        )

      }
    } else {
      //pongan mensaje de contraseñas no coinciden
      alert('Contraseñas no coinciden');
    }

    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }


  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {
        this.institutions=res;
      },
      error => console.log(error)

    )
  }



  Onlogin():void{

    this.generalUserService.login(this.loginForm.value)
    .subscribe((res)=>{
      console.log(res);
      if(res){
        this.router.navigate(['usuario/eventos']);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN
        // console.log("entro a redireccionar",res);
      }
    },error=> alert(error.error.message));
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  OnRestartPassword() {
    $('#login').removeClass('show');
    $('.modal-backdrop').remove();

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/resetear-contrasenia`])
    );

    window.open(url, '_blank');
  }

  closeRestartPassword() {
    $('.modal-backdrop').remove();
    $('#restartPassword').css('display', 'none');
    $('#restartPassword').addClass('hide');
  }
}
