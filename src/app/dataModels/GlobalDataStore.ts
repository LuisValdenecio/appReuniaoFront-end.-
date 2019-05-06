import {Injectable} from '@angular/core';
import {LoginModel , UserModel, ClassModel} from './AllDataModel';
import { HttpClient, HttpResponse } from "@angular/common/http";
import {Observable, from} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable() 
export class GlobalDataStore {

    public auth_token : String;
    
    constructor(private http : HttpClient) {}
        
    public authenticate(user: String, pass: String): Observable<boolean> {
        return this.http.post<any>(API_URL + "/login", {
            name: user, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : "a string";
            return response.success;
        }));
    }

    // para efeitos de simplicidade, decidi colocar aqui todos os métodos http de manipulação dos endpoints do API
    public saveTeacher(teacher : any) : Observable<any> {
        return this.http.post<any>(API_URL + '/teachers', teacher);
    }

    public getAllStudents() : any {
        return this.http.get(API_URL + '/students').pipe(map(response => {
            const users = response;
            return users;
        }))
    }

    // -->> esta chamada é crucial para determinar qual modal mostrar em cada estudante
    public getClassGrade(classURL : String) : any {
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const grade = response;
            return grade;
        }))
    }
    
    public getAllCourses() : any {
        return this.http.get(API_URL + '/cursos').pipe(map(response => {
            const users = response;
            return users;
        }))
    }

    public getAllClasses() : any {
        return this.http.get(API_URL + '/classes').pipe(map(response => {
            const classes = response;
            return classes;
        }))
    }

    public getThisClassSubjects(classURL : String) : any {
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const subjects = response;
            return subjects;
        }))
    }

    public createClass(courseName : ClassModel) : Observable<ClassModel> {
        return this.http.post<ClassModel>(API_URL+'/turmas', courseName);
    }


}
