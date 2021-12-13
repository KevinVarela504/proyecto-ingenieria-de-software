import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/interfaces/inscription';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';

@Injectable({
  providedIn: 'root'
})
export class ScheduledEventService {

  constructor(private http:HttpClient) { }

  getAllScheduledEvents():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/scheduled-event/getAll`,{});
  }

  getAllScheduledEventsWhere(idEvent: number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/scheduled-event/getAllWhere/${idEvent}`);
  }

  getScheduledEventCertificate(idSheduleEvent:number):Observable<Inscription[]>{
    return this.http.get<Inscription[]>(`http://localhost:3000/inscriptions/certificados/${idSheduleEvent}`);
  }

  getOneScheduledEvent(scheduledEventId: number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/scheduled-event/getScheduledEvent/${scheduledEventId}`,);
  }

  createScheduledEvent(schEvent:ScheduledEvent):Observable<any>{
    return this.http.post<ScheduledEvent>(`http://localhost:3000/scheduled-event/createScheduledEvent`,schEvent);
  }

  deleteScheduledEvent(scheduledEventId:number):Observable<ScheduledEvent>{
    return this.http.delete<ScheduledEvent>(`http://localhost:3000/scheduled-event/deleteScheduledEvent/${scheduledEventId}`,{}); 
  }

  updateScheduledEvent(scheduledEventId:number, schEvent:ScheduledEvent):Observable<ScheduledEvent>{
    return this.http.put<ScheduledEvent>(`http://localhost:3000/scheduled-event/updateScheduledEvent/:${scheduledEventId}`,schEvent);
   }
}
