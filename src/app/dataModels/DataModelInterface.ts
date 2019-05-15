import {Injectable} from '@angular/core';
import {LoginModel, UserModel, ClassModel} from './AllDataModel';
import {GlobalDataStore} from './GlobalDataStore';
import {LoginAuthService } from './login-auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class DataModelInterface {

    userToAdd : UserModel;
    

    constructor(private loginAuthService : LoginAuthService, private globalDataStore : GlobalDataStore) {}

    public loginCheck(email : String, password : String) : Observable<any> {
        return this.globalDataStore.login(email, password);
    }

    public saveTeacher(teacher : any) : Observable<any> {
        return this.globalDataStore.saveTeacher(teacher);
    }

    public sendFaults(faultsObject : any) : Observable<any> {
        return this.globalDataStore.sendFaults(faultsObject);
    }

    public getToken() {
        return this.globalDataStore.getToken();
    }

    public logout() {
        this.loginAuthService.clear();
    }

    public getAllCourses() {
        return this.globalDataStore.getAllCourses();
    }   
 
    public getAllClasses() {
        return this.globalDataStore.getAllClasses();
    }

    public getAllStudents() {
        return this.globalDataStore.getAllStudents();
    }

    public getAllStudentsFromCLass(thisClassURL : String) {
        return this.globalDataStore.getAllStudentsFromClass(thisClassURL);
    }

    public getThisClassTeachers(thisClassURL : String) {
        return this.globalDataStore.getThisClassTeacher(thisClassURL);
    }

    public getThisTeachersSubjects(teacherAndClassCode : String) {
        return this.globalDataStore.getThisTeachersSubjects(teacherAndClassCode);
    }

    public getAllSubjects(thisClassURL : String) {
        return this.globalDataStore.getThisClassSubjects(thisClassURL);
    }

    public getClassGrade(thisClassURL : String) {
        return this.globalDataStore.getClassGrade(thisClassURL);
    }

    public getThisClassFaults(thisClassURL : String) {
        return this.globalDataStore.getThisClassFaults(thisClassURL);
    }

    public getClassGrades(thisClassURL : String) {
        return this.globalDataStore.getClassGrades(thisClassURL);
    }

    // -->> retorna as turmas onde este professor leciona
    public getThisTeacherClasses(teacherCode : String) {
        return this.globalDataStore.getThisTeacherClasses(teacherCode);
    }
    
    public createClass(nomeCurso : String) {
        var turmaCriar = new ClassModel(nomeCurso);
        this.globalDataStore.createClass(turmaCriar);
    }

    public parseJwt = function(token : any) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

}