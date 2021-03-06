import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Custom Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //Para el estilo de imagen en input, etc.
import { ReactiveFormsModule } from "@angular/forms"; //Para el formulario de Login.
import { AngularFireModule } from '@angular/fire'; //Firebase (inicializar conexion con fb).
import { AngularFireAuthModule } from '@angular/fire/auth'; //Authorization firebase.
import { ServiceWorkerModule } from '@angular/service-worker'; //PWA

//Archivos de datos
import { environment } from 'src/environments/environment';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainmenuComponent } from './components/menu/mainmenu/mainmenu.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { AboutComponent } from './components/inicio/about/about.component';
import { ContactoComponent } from './components/inicio/contacto/contacto.component';
import { AjustesComponent } from './components/menu/ajustes/ajustes.component';
import { ResumenComponent } from './components/menu/resumen/resumen.component';

//Servicios
import { NavbarService } from './services/navbar.service';
import { AuthService } from './services/auth.service';
import { FontawesomeService } from './services/fontawesome.service';
import { HistorialComponent } from './components/menu/historial/historial.component';
import { NotfoundComponent } from './components/inicio/notfound/notfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CambiarNombreComponent } from './components/menu/ajustes/cambiar-nombre/cambiar-nombre.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainmenuComponent,
    RegistroComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactoComponent,
    AjustesComponent,
    HistorialComponent,
    NotfoundComponent,
    ResumenComponent,
    CambiarNombreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [NavbarService, AuthService, FontawesomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }