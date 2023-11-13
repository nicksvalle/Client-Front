import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/client/client.component';
import { PropostaComponent } from './components/proposta/proposta.component';
import { HeaderComponent } from './components/header/header.component';


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
