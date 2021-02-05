import { Injectable } from '@angular/core';
import{ faEnvelope, faLock, faUser, faCheck, faChevronRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class FontawesomeService {

  constructor() { }

  //Login
  public faEnvelope = faEnvelope;
  public faLock = faLock;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  //Registro
  public faUser = faUser;
  public faCheck = faCheck;

  //Ajustes (menu)
  public faChevronRight = faChevronRight;
}
