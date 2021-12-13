import { RestartPasswordComponent } from './components/restartPassword/restart-password/restart-password.component';
import { ChangePasswordComponent } from './components/changePassword/change-password/change-password.component';
import { UserGuard } from './guards/user/user.guard';
import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MyeventsComponent } from './components/user/myevents/myevents.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyeventComponent } from './components/user/myevent/myevent.component';
import { EventComponent } from './components/user/event/event.component';
import { ParticipantsComponent } from './components/user/myevent/participants/participants.component';
import { PublicProfileComponent } from './components/user/public-profile/public-profile.component';
import { EventHourComponent } from './components/user/statistics/event-hour/event-hour.component';
import { EventInstitutionComponent } from './components/user/statistics/event-institution/event-institution.component';
import { EventStateComponent } from './components/user/statistics/event-state/event-state.component';
import { EventUserComponent } from './components/user/statistics/event-user/event-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent},
  //{ path: 'usuario', component:  UserComponent, canActivate: [UserGuard], canActivateChild: [UserGuard], children: [
  { path: 'usuario', component:  UserComponent, children: [
  //  {path: '', redirectTo: '/usuario/eventos', pathMatch: 'full'},
    {path: 'eventos', component: DashboardComponent},
    {path: 'mis-eventos', component: MyeventsComponent},
    {path: 'perfil', component: ProfileComponent},
    {path: 'estadisticas', component: StatisticsComponent, children: [
      {path: 'estadisticas/evento-hora', component: EventHourComponent},
      {path: 'estadisticas/evento-institucion', component: EventInstitutionComponent},
      {path: 'estadisticas/evento-estado', component: EventStateComponent},
      {path: 'estadisticas/evento-usuario', component: EventUserComponent},
    ]},
    {path: 'mi-evento/:name', component: MyeventComponent},
    {path: 'evento/:name', component: EventComponent},
    {path: 'mi-evento/:name/participants/:id', component: ParticipantsComponent},
    {path: 'perfil-publico/:id', component: PublicProfileComponent}
  ] },
  { path: 'restaurar-contrasenia/:email', component: ChangePasswordComponent },
  { path: 'resetear-contrasenia', component: RestartPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
