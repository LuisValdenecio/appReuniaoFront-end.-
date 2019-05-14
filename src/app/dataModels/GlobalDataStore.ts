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
     
    private request(method : 'post'|'get', type : any, user? : any) : Observable<any> {
        let base;

        if (method === 'post') {
            base = this.http.post(API_URL + '/login', user);
        } else if (method == 'get') {
            // make every possible get request carry itselt with the JWT
            base = this.http.get(`${API_URL}${type}`, { headers : {Authorization : `Bearer ${this.getToken()}`}})
        }

        const request = base.pipe(map((data : any)=>{
            if (data.token) {
                localStorage.setItem('goldToken', data.token);
                this.auth_token = data.token;
            }
            return data;
        }));

        return request;
    }

    private getToken() {
        if (!this.auth_token) {
            return localStorage.getItem("goldToken");
        }
        return this.auth_token;
    }
    
    public login(user: String, pass: String): Observable<boolean> {
        return this.request('post', 'login',  {'email' : user, 'password' : pass});
    }
    
    // para efeitos de simplicidade, decidi colocar aqui todos os métodos http de manipulação dos endpoints do API
    public saveTeacher(teacher : any) : Observable<any> {
        return this.http.post<any>(API_URL + '/teachers', teacher);
    }

    public getAllStudents() : any {
        return this.request('get', '/students');
    }

    // -->> esta chamada é crucial para determinar qual modal mostrar em cada estudante
    public getClassGrade(classURL : String) : any {
        return this.request('get', classURL);
        /*
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const grade = response;
            return grade;
        }))
        */
    }
    
    public getThisClassFaults(classURL) : any {
        return this.request('get', classURL);
        /*
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const faults = response;
            return faults;
        }))
        */
    }

    public getClassGrades(classURL) : any {
        return this.request('get', classURL);
        /*
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const grades = response;
            return grades;
        }))
        */
    }

    public getThisClassSubjects(classURL : String) : any {
        return this.request('get', classURL);
        /*
        return this.http.get(API_URL + classURL).pipe(map(response =>{
            const subjects = response;
            return subjects;
        }))
        */
    }

    public getAllCourses() : any {
        return this.request('get', '/cursos');
        /*
        return this.http.get(API_URL + '/cursos').pipe(map(response => {
            const users = response;
            return users;
        }))
        */
    }

    public getAllClasses() : any {
        return this.request('get', '/classes');
        /*
        return this.http.get(API_URL + '/classes').pipe(map(response => {
            const classes = response;
            return classes;
        }))
        */
    }

    public createClass(courseName : ClassModel) : Observable<ClassModel> {
        return this.request('post', '/turmas');
        //return this.http.post<ClassModel>(API_URL+'/turmas', courseName);
    }

    public logout() {
        this.auth_token = null;
        localStorage.clear();
    }

    public isLoggedIn() {
        if (!this.auth_token) {
            return localStorage.getItem('goldToken') != null;
        }
        return this.auth_token != null;
    }
}
