import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';

@Component({
  selector: 'app-event-institution',
  templateUrl: './event-institution.component.html',
  styleUrls: ['./event-institution.component.scss']
})
export class EventInstitutionComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Otra'];
  public barChartType: ChartType = "pie";
  public barChartLegend = true;

  public barChartData = [
    {data: [1,2,3,4,5,6], label: 'Evento por institución'},
    
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
    this.eventsByInstChart();
    
  }

  eventsByInstChart(){
    var instNames: string[] = [];
    var instIds: number[] = [];
    const dataEvent : number[] = [];
    
    this.institutionService.getInstitutions().subscribe(
      inst =>  {
        console.log(inst)
        for(let i = 0; i < inst.length; i++){
            instNames.push(inst[i].name);
            instIds.push(Number(inst[i].InstitutionID));
          }
          //this.barChartData[0].data = dataEvent;
        },
        error => console.log(error)
        );
    this.barChartLabels = instNames;
    this.eventServ.getAllEvents().subscribe(
      res =>  {
        instIds.forEach(element => {
          for(let j = 0; j < res.length; j++){
           
              dataEvent.push(j);
            }
          }

        );
      },
      error => console.log(error)
      )
    }
}
