import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-event-hour',
  templateUrl: './event-hour.component.html',
  styleUrls: ['./event-hour.component.scss']
})
export class EventHourComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    maintainAspectRatio: false,

  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;

  public barChartData = [
    {data: [1,2,3,4,5,6], label: 'Eventos por día'},
    
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
    this.eventsByHourChart();
    
  }

  eventsByHourChart(){

    this.eventServ.getAllEvents().subscribe(
      res =>  {
        var dateEvent =[];
        var dataEvent =[];
        var dataEventDay =[];
        for(let i = 0; i < res.length; i++){
          let event = res[i];
          let date = new Date(event.startDate);
          let hour = date.getHours();
          let day = date.getDay();
          let month = date.getMonth();
          let year = date.getFullYear();
          let dateString = `${day}/${month}/${year}`;
          
          dataEvent.push(date.getDate() + 1);
          //dateEvent.push('Día '+String(date.getDate() + 1));
        }
        const countOccurrences = (arr:number[], val:number) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        
        for (let i = 0; i < 32; i++){
          var ocurr = countOccurrences(dataEvent, i);
          if(ocurr != 0){
            dateEvent.push('Día '+i);
            dataEventDay.push(ocurr);
          }
        }
        
        this.barChartLabels = dateEvent;
        this.barChartData[0].data = dataEventDay;
      },
      error => console.log(error)
    )
  }
}
