import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { PropostaComponent } from './proposta/proposta.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
  {path: 'home', component: HomeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'proposta', component: PropostaComponent},
  ]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
