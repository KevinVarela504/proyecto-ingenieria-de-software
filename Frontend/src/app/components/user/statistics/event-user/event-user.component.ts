import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss']
})
export class EventUserComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    maintainAspectRatio: false,

  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;

  public barChartData = [
    {data: [1,2,3,4,5,6], label: 'Eventos por organizador'},
    
  ];
  //public startDate: Date;
  //public fechaStrMinima:string ;
  constructor(private eventServ: EventsService,
    private institutionService: InstitutionService,
    private schEvent : ScheduledEventService,
    private pipe:DatePipe,) { 
      //this.startDate= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      //this.fechaStrMinima= this.pipe.transform(this.startDate, "yyyy-MM-dd")!;

    }

  ngOnInit(): void {
    this.eventsByUserChart();
    
  }

  eventsByUserChart(){

    this.eventServ.getAllEvents().subscribe(
      res =>  {
        var userByEvent =[];
        var dataEvent =[];
        var dataEventByUser =[];
        for(let i = 0; i < res.length; i++){
          userByEvent.push(res[i].userId);
          //dateEvent.push('Día '+String(date.getDate() + 1));
        }
        const countOccurrences = (arr:string[], val:string) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        
        for (let i = 0; i < userByEvent.length; i++){
          var ocurr = countOccurrences(userByEvent, userByEvent[i]);
          console.log(ocurr);

          if(ocurr != 0){
            dataEvent.push(userByEvent[i]);
            dataEventByUser.push(ocurr);
          }
          i += ocurr;
        }
        
        this.barChartLabels = dataEvent;
        this.barChartData[0].data = dataEventByUser;
        
      },
      error => console.log(error)
    )
  }
}
