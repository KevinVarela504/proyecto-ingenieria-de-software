import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { institution } from 'src/app/interfaces/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  
  constructor(private httpClient:HttpClient) { }

  createInstitution(institution:institution):Observable<institution>{
    return this.httpClient.post<institution>('http://localhost:3000/institutions/createInstitution',institution);
   }

  getInstitutions():Observable<institution[]>{
    return this.httpClient.get<institution[]>('http://localhost:3000/institutions/getAll',{});
   }
   
  getInstitution(idInstituto:number):Observable<institution>{
    return this.httpClient.get<institution>(`http://localhost:3000/institutions/getInstitution/${idInstituto}`,{});
   } 
  
  deleteInstitution(idInstituto:String):Observable<institution>{
    return this.httpClient.delete<institution>(`http://localhost:3000/institutions/institutions/deleteInstitution/${idInstituto}`,{});
   } 
  
    
  updateInstitution(idInstituto:String, institution:institution):Observable<institution>{
    return this.httpClient.put<institution>(`http://localhost:3000/institutions/updateInstitution/${idInstituto}`,institution);
   } 
}
