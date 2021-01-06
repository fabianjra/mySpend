import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Custom Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //Para el estilo de imagen en input, etc.
import { ReactiveFormsModule } from "@angular/forms"; //Para el formulario de Login.

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainmenuComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }