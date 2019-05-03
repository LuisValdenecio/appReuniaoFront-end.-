import {Injectable} from '@angular/core';
import {LoginModel, UserModel, ClassModel} from './AllDataModel';
import {GlobalDataStore} from './GlobalDataStore';
import {LoginAuthService } from './login-auth.service';

@Injectable()
export class DataModelInterface {

    userToAdd : UserModel;

    constructor(private loginAuthService : LoginAuthService, private globalDataStore : GlobalDataStore) {}

    public loginCheck(email : String, password : String) {
        this.loginAuthService.authenticate(email, password);
    }

    public isUserAuthenticated() {
        return this.loginAuthService.authenticated;
    }

    public getAllCourses() {
        return this.globalDataStore.getAllCourses();
    }   
    
    public getAllStudents() {
        return this.globalDataStore.getAllStudents();
    }
    
    public getAllClasses() {
        return this.globalDataStore.getAllClasses();
    }

    public createClass(nomeCurso : String) {
        var turmaCriar = new ClassModel(nomeCurso);
        this.globalDataStore.createClass(turmaCriar);
    }

}