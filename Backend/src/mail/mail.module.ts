import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { UsersModule } from 'src/users/users.module';

const mail={
  user:'desarrolladorkevin@gmail.com',
  pass:'Ge1potato'
};
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: mail.user,
          pass: mail.pass,
        },
      },
      defaults: {
        from: '"Event Serve" <desarrolladorkevin@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),UsersModule
  ],
  providers: [MailService],
  exports: [MailService], //  export for DI
})
export class MailModule {}
