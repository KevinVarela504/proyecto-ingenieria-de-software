import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/interfaces/event';
import { Status } from 'src/app/interfaces/status';
import { ImageEvent } from 'src/app/interfaces/ImageEvent';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient:HttpClient) { }
  url:string='';

  getAllEvents():Observable<Event[]>{
    return this.httpClient.get<Event[]>(`http://localhost:3000/events/getAllEvents`,{});
}
  getAllEventsDash(email : string):Observable<Event[]>{
      return this.httpClient.get<Event[]>(`http://localhost:3000/events/getAllEventsDash/${email}`,{});
  }

  getFilterEvents(type: string, keyword: string):Observable<Event[]>{
    return this.httpClient.get<Event[]>(`http://localhost:3000/events/getFilterEvents`,{params: {type: type, keyword: keyword}});
}

  getEvent(idEvento:number):Observable<Event>{
       return this.httpClient.get<Event>(`http://localhost:3000/events/getOneEventById/${idEvento}`,{});
  }

  createEvent(event:Event,email:string):Observable<Event>{
    return this.httpClient.post<Event>(`http://localhost:3000/events/createEvent/${email}`,event);
   }

   getEventsForUser(email : string):Observable<Event[]>{
    return this.httpClient.get<Event[]>(`http://localhost:3000/events/getAllEventsWhere/${email}`,{});
   }


  updateEvent(idEvento:number, event:Event):Observable<Event>{
    return this.httpClient.put<Event>(`http://localhost:3000/events/updateEvent/${idEvento}`,event);
   }

  deleteEvent(idEvento:number):Observable<Event>{
   return this.httpClient.delete<Event>(`http://localhost:3000/events/deleteEvent/${idEvento}`,{});
  }

  addImageEvent(idEvent:number,url:any):Observable<any>{
    this.url=url;
    console.log("llego al service")
    return this.httpClient.post<any>(`http://localhost:3000/event-images/addImageEvent`,Object({'eventId':idEvent,'URL':this.url}));
   }

   
  getImageByEvent(idEvent:number):Observable<ImageEvent[]>{
    return this.httpClient.get<ImageEvent[]>(`http://localhost:3000/event-images/getImageByEvent/${idEvent}`);
   }



//Status


  getStatus(statusId: number):Observable<Status>{
   return this.httpClient.get<Status>(`http://localhost:/status/getStatus/${statusId}`,{});
  }


  getAllStatus():Observable<Status[]>{
    return this.httpClient.get<Status[]>(`http://localhost:/status/getAll`,{});
   }

  updateStatus(statusId:number):Observable<Status>{
    return this.httpClient.put<Status>(`http://localhost:/status/${statusId}/`,{});
   }





}
