import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/interfaces/inscription';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }
 
  
  createInscription(body: any):Observable<any>{
    return this.http.post<any>(`http://localhost:3000/inscriptions/createInscription`,body);
  }

  deleteInscription(idScheduledEventF:number,idUserF:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/inscriptions/deleteInscription/${idScheduledEventF}/${idUserF}`,);
  }

  getOneInscription(inscriptionId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/inscriptions/getInscription/${inscriptionId}`)
  }

  getInscriptions():Observable<any>{
    return this.http.get<any>(`http://localhost:3000/inscriptions/getAll`)
  }

  getInscriptionsByShedEvent(idScheduledEventF:number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/inscriptions/getAllByShedEvent/${idScheduledEventF}`)
  }

  updateInscriptions(inscriptionId:number, insc: Inscription):Observable<any>{
    console.log(inscriptionId)
    return this.http.put<any>(`http://localhost:3000/inscriptions/updateInscription/${inscriptionId}`, insc);
  }

}

