import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AboutComponent } from './components/inicio/about/about.component';
import { ContactoComponent } from './components/inicio/contacto/contacto.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { NotfoundComponent } from './components/inicio/notfound/notfound.component';
import { CambiarNombreComponent } from './components/menu/ajustes/cambiar-nombre/cambiar-nombre.component';
import { MainmenuComponent } from './components/menu/mainmenu/mainmenu.component';
import { AuthGuard } from './guards/auth.guard';

/*
NOTA: Asteriscos (**): Cuando sea una ruta desconocida. Ejem de uso: Error pagina desconocida.
El pato '', se deja con redirectTo, porque si se utiliza diractamente el component: HomeComponent,
no selecciona "inicio" en el navbar.

Secciones:
1: Espacion vacio
2: Pantallas estaticas, solo visual.
3: Pantallas de Authorization.
4: Pantallas del menu de acciones transaccionales. (AuthGuard impide que cargue si no esta logueado)
5: Pagina para cuando no se encuentra una URL.
*/
const routes: Routes = [
  { path: '', redirectTo: 'mainmenu', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'mainmenu', component: MainmenuComponent, canActivate: [AuthGuard] },

  { path: 'cambiarNombre', component: CambiarNombreComponent },

  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }