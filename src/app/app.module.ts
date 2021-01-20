import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Custom Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //Para el estilo de imagen en input, etc.
import { ReactiveFormsModule } from "@angular/forms"; //Para el formulario de Login.

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainmenuComponent } from './components/menu/mainmenu/mainmenu.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { NavbarService } from './services/navbar.service';
import { AboutComponent } from './components/inicio/about/about.component';
import { ContactoComponent } from './components/inicio/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainmenuComponent,
    RegistroComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }