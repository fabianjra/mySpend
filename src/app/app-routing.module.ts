import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { HomeComponent } from './components/incio/home/home.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';

//NOTA: Asteriscos (**): Cuando sea una ruta desconocida. Ejem de uso: Error pagina desconocida
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mainmenu', component: MainmenuComponent },
  { path: 'home',component: HomeComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }