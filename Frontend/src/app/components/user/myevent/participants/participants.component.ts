import { Component, OnInit } from '@angular/core';
import { CheckInService } from 'src/app/services/check in/check-in.service';
import { Inscription } from 'src/app/interfaces/inscription';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  mode: boolean = false;

  constructor(
    private checkInService: CheckInService,
    private generalUserService: GeneralUserService,
    private activatedRoute:ActivatedRoute,
    private schEvent : ScheduledEventService
    ) { }

  updateInscription: any;

  sheduleEventId: any = {
    id: null
  };

  inscription: any = {
    userName: '',
    userId: '',
    attendance: '',
    idInscription: '',
    idScheduledEvent: '',
  };

  inscriptions:Inscription[] = [];

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.sheduleEventId = params.id;
    }
    this.getInscription();
    console.log(this.inscriptions)
  }
  
  getInscription(): void{
    
    this.checkInService.getInscriptionsByShedEvent(this.sheduleEventId).subscribe(
      (data: Inscription[]) => {
        if (data) {
          console.log(data);
          this.inscriptions = data;

          for (let i = 0; i < this.inscriptions.length; i++) {
            if( this.inscriptions[i].attendance == true) {
              this.changeMod(this.inscriptions[i].attendance);
            }
          }
        }
        
        /*
        this.inscriptions.forEach(inscription => {
          this.generalUserService.getUser(inscription.idUser).subscribe(
            (data: any) => {
              var completeName = data.firstName + ' ' + data.lastName;
              this.inscription.userName = completeName;
              this.inscription.userId = data.email;
              this.inscriptionList.push(this.inscription);
            }
          )
        });
        */
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAttendance() {
    this.inscriptions.forEach(inscription => {
      this.updateInscription = {
        nameUser: inscription.nameUser,
        idUser: inscription.idUser,
        attendance: inscription.attendance,
        idScheduledEvent: inscription.idScheduledEvent,
      }; 
      this.checkInService.updateInscriptions(inscription.idInscription, this.updateInscription).subscribe(
        (data: any) => {
          console.log(data);
          alert('Asistencia guardada exitosamente')
        }
      )
    });
    console.log(this.inscriptions);
  }

  changeMod(val: boolean): void {
    
    console.log(val);
    this.mode = val == true ? false : true;
  }

  attendanceList(){
    this.schEvent.getScheduledEventCertificate(this.sheduleEventId).subscribe(
      res => {
    var win = window.open('', '_blank', 'width=600px');
    win?.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <style>
        @media print {
          @page { margin: 0; size: landscape; }
          body { margin: 1.6cm; }
        }

        html {
          height: 100%;
          width: 100%;
        }

        div {
          width: 100%;
        }

        .diploma {
          position: relative;
          height: 740px;
          width: 902px;
          box-sizing: border-box;
          padding: 1rem;
          page-break-after: always;
        }

        .diploma img {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: fit-content;
        }

        .diploma-content {
          z-index: 10;
          position: absolute;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        </style>
      </head>
      <body>
      <div><h2>LISTADO DE ASISTENCIA</h2></div>
      `);

      res.forEach(resp=>{ 
        win?.document.write(`
        <table class="container table table-hover table-striped table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Asistencia</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>`+resp.nameUser +`</td>
                <td>`+resp.idUser +`</td>
                <td class="asistence">
                    <div class="form-check">
                        <label class="form-check-label" for="defaultCheck1">
                            Asistencia
                        </label>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
      `);
    })
    win?.document.write(`
      </body>
    </html>
    `);
    win?.document.close();
    win?.addEventListener('load', () => {
      win?.print();
    });},
    error => console.log(error)
    )
  }
}