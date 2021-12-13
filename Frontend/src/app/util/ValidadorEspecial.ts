
import { AbstractControl, FormControl, FormControlName, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";




export class ValidadoresEspeciales{
  public static ValidarFechas(elemento:FormControl){
    let texto= elemento.value;
    let invalido:boolean=false;
    let aux:Date= new Date(texto);
    let fechaseleccionada:Date = new Date(aux.getFullYear(),aux.getUTCMonth(), aux.getUTCDate());
     invalido = (fechaseleccionada<new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()))
    return invalido? {fechainvalida:true}:null; 
  }
}



export function dateValidator(control: AbstractControl) {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;
  let fechainicio =  new Date(Date.parse(start));
  let fechaFinal = new Date(new Date(end).getFullYear(),new Date(end).getUTCMonth(), new Date(end).getUTCDate());
  
  console.log(new Date(start));
  console.log(fechaFinal)
  let invalido:boolean
  /*console.log('invalido= ',(new Date(end ).getTime()-new Date(start).getTime() <0 ));*/
  invalido=((new Date(end ).getTime()-new Date(start).getTime() <0 ));
  return  invalido? { dateValid:true }:null ;
  
    }


    export function hourValidator(control: AbstractControl) {
      const start = control.get('startHour')?.value;
      const end = control.get('endHour')?.value;
      
      let invalido:boolean
      /*console.log('invalido= ',(new Date(end ).getTime()-new Date(start).getTime() <0 ));*/
      invalido=((new Date(end ).getTime()-new Date(start).getTime() <0 ));
      return  invalido? { hourValid:true }:null ;
      
        }

    
    export function passwordMatchValidator(g: AbstractControl) {
        const password=g.get('password_')?.value;
        const repassword=g.get('repassword_')?.value
        let invalido:boolean;
        invalido=(password!==repassword)
       /* console.log('invalido= ',invalido);*/
        
        return invalido? { 'mismatch': true }:null;
    }


    