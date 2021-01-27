import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //FontAwesome
  faEnvelope = faEnvelope;
  faLock = faLock;

  public lblError: string;

  //Called first time before the ngOnInit()
  constructor(private router: Router, private authService: AuthService) {

    //Se inicializan los campos como string vacios
    this.lblError = "";
  }

  formLogin_event() {
    try {
      this.lblError = "";
      const { email, password } = this.formLogin.value;

      console.log("1 mail:" + email);
      console.log("2 password:" + password);


      if (email == "" || password == "") {
        this.lblError = "Se deben ingresar los datos";
      } else {

        let result = this.authService.Login(email, password);

        console.log(result);

        //this.router.navigate(['mainmenu']);

      }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  Registrarse_click() {
    try {
      this.router.navigate(['registro']);
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  text_changed(): void {
    this.lblError = "";
  }

  //Called after the constructor and called  after the first ngOnChanges()
  ngOnInit(): void {
  }

}
