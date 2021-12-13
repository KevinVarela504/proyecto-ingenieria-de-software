import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-state',
  templateUrl: './event-state.component.html',
  styleUrls: ['./event-state.component.scss']
})
export class EventStateComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = "pie";
  public barChartLegend = true;

  public barChartData = [
    {data: [1,2,3,4,5,6], label: 'Eventos por día'},
    
  ];
  public startDate: Date;
  public fechaStrMinima:string ;
  constructor(private eventServ: EventsService,
    private institutionService: InstitutionService,
    private schEvent : ScheduledEventService,
    private pipe:DatePipe,) { 
      this.startDate= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.startDate, "yyyy-MM-dd")!;

    }

  ngOnInit(): void {
    this.eventsByStateChart();
    
  }

  eventsByStateChart(){

    this.eventServ.getAllEvents().subscribe(
      res =>  {
        var states = ['Activo', 'En Curso', 'Finalizado'];
        var active = 0;
        var current = 0;
        var finished = 0;

        var dataEventState =[];
        for(let i = 0; i < res.length; i++){
          let event = res[i];
          let endDate = new Date(event.endDate);
          let startDate = new Date(event.startDate);
          
          if(endDate < new Date()){
            finished++;
          }
          
          if(endDate > new Date() && startDate < new Date()){
            current++;
          }
          
          if(endDate > new Date() && startDate > new Date()){
            active++;
          }
        }
        this.barChartLabels = states;
        dataEventState.push(active);
        dataEventState.push(current);
        dataEventState.push(finished);
        this.barChartData[0].data = dataEventState;
      },
      error => console.log(error)
    )
  }
}

