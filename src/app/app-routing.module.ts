import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AboutComponent } from './components/inicio/about/about.component';
import { ContactoComponent } from './components/inicio/contacto/contacto.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { MainmenuComponent } from './components/menu/mainmenu/mainmenu.component';

//NOTA: Asteriscos (**): Cuando sea una ruta desconocida. Ejem de uso: Error pagina desconocida
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'contacto', component: ContactoComponent },
        { path: 'about', component: AboutComponent }
      ]
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'mainmenu', component: MainmenuComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }