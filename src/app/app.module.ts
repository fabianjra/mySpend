import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Custom Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';


@NgModule({
  declarations: [
    LoginComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
