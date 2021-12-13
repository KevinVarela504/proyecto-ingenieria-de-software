import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { MyeventsComponent } from './components/user/myevents/myevents.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { MyeventComponent } from './components/user/myevent/myevent.component';
import { EventComponent } from './components/user/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


//import { AngularFirestoreModule } from  '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/changePassword/change-password/change-password.component';
import { RestartPasswordComponent } from './components/restartPassword/restart-password/restart-password.component';
//import { AngularFirestoreModule } from  '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AngularFireModule} from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PublicProfileComponent } from './components/user/public-profile/public-profile.component';
import { ParticipantsComponent } from './components/user/myevent/participants/participants.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventHourComponent } from './components/user/statistics/event-hour/event-hour.component';
import { EventInstitutionComponent } from './components/user/statistics/event-institution/event-institution.component';
import { EventStateComponent } from './components/user/statistics/event-state/event-state.component';
import { EventUserComponent } from './components/user/statistics/event-user/event-user.component';

import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';


 const config={
  apiKey: 'AIzaSyArD0fzANzKYTs4k8rLHbK3UnCWG_Ip9pM',
  authDomain: 'project-796279284343',
  databaseURL: 'AIzaSyArD0fzANzKYTs4k8rLHbK3UnCWG_Ip9pM',
  projectId: 'imageneseventos-1e0bb',
  storageBucket: 'gs://imageneseventos-1e0bb.appspot.com',
  messagingSenderId: '796279284343'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
    DashboardComponent,
    MyeventsComponent,
    StatisticsComponent,
    MyeventComponent,
    EventComponent,
    HomeComponent,
    ChangePasswordComponent,
    RestartPasswordComponent,
    PublicProfileComponent,
    ParticipantsComponent,
    EventHourComponent,
    EventInstitutionComponent,
    EventStateComponent,
    EventUserComponent,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    Ng2SearchPipeModule,
    AngularFireAuthModule,
    AngularFireStorageModule,// storagec
    AngularFireDatabaseModule, NoopAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
