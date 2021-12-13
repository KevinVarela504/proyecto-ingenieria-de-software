import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,private userService:UsersService) {}
  
    async sendUserPassword(emailUser:string) {
      const user=this.userService.findUserAuth(emailUser)
      const  name=(await user).firstName;
      await this.mailerService.sendMail({
        to: emailUser,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Recuperacion de Contraseña',
        template: './sendPassword', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
          name: name,
          url:`http://localhost:4200/restaurar-contrasenia/${emailUser}`
        },
      });
    }

    async sendCharge(emailCharge:string,
      nameCharge:string,
      nameEvent:string,
      startDate:string,endDate:string,startHour:string,endHour:string,modality:string) {
      console.log("a este correo se manda del encargado del evento",emailCharge);
      await this.mailerService.sendMail({
        to: emailCharge,
        subject: 'Encargado de evento',
        template: './notifyInCharge', 
        context: { 
          name: nameCharge,
          nameEvent:nameEvent,
          startDate:startDate,
          endDate:endDate,
          startHour:startHour,
          endHour:endHour,
          modality:modality
        },
      });
    }


    async sendUserInscription(emailUser:string,
      nameUser:string,
      nameEvent:string,
      startDate:string,endDate:string,startHour:string,endHour:string,modality:string) {
      console.log("a este correo se manda la confirmaccion de la inscripcion evento",emailUser);
      await this.mailerService.sendMail({
        to: emailUser,
        subject: 'Inscripcion Realizada con Exito',
        template: './userInscription', 
        context: { 
          name: nameUser,
          nameEvent:nameEvent,
          startDate:startDate,
          endDate:endDate,
          startHour:startHour,
          endHour:endHour,
          modality:modality
        },
      });
    }
}
