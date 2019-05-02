import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import { GlobalDataStore } from './GlobalDataStore';

@Injectable()
export class LoginAuthService {

  constructor(private globalDataStore : GlobalDataStore) { }

  authenticate(username: String, password: String): Observable<boolean> {
    return this.globalDataStore.authenticate(username, password);
  }
  
  get authenticated(): boolean {
    return this.globalDataStore.auth_token != null;
  }

  clear() {
    this.globalDataStore.auth_token = null;
  }

}
