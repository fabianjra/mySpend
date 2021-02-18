import { Injectable } from '@angular/core';
import{ faEnvelope, faLock, faUser, faCheck, faChevronLeft, faChevronRight,
  faEye, faEyeSlash, faUtensilSpoon, faMedkit, faGlassCheers } from '@fortawesome/free-solid-svg-icons';

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
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;

  //Categorias
  public faUtensilSpoon = faUtensilSpoon;
  public faMedkit = faMedkit;
  public faGlassCheers = faGlassCheers;
}
