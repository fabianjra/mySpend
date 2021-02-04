import { Injectable } from '@angular/core';
import { faEnvelope, faLock, faUser, faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class FontawesomeService {

  constructor() { }

  //Para login
  public faEnvelope = faEnvelope;
  public faLock = faLock;

  //Para registro
  public faUser = faUser;
  public faCheck = faCheck;

  public faChevronRight = faChevronRight;
}
