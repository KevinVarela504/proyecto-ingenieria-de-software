import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './componentes/users/users.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/users/dashboard/dashboard.component';
import { EventComponent } from './componentes/users/event/event.component';
import { MyeventsComponent } from './componentes/users/myevents/myevents.component';
import { ProfileComponent } from './componentes/users/profile/profile.component';
import { StatisticsComponent } from './componentes/users/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    DashboardComponent,
    EventComponent,
    MyeventsComponent,
    ProfileComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
