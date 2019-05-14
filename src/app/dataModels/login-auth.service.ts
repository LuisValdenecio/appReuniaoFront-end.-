import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import { GlobalDataStore } from './GlobalDataStore';

@Injectable()
export class LoginAuthService {

  constructor(private globalDataStore : GlobalDataStore) { }
  
  get isAuthenticated(): boolean {
    return this.globalDataStore.isLoggedIn();
  }

  clear() {
    this.globalDataStore.logout();
  }

}
