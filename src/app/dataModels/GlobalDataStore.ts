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

    public getToken() {
        if (!this.auth_token) {
            return localStorage.getItem("goldToken");
        }
        return this.auth_token;
    }
    
    
    // para efeitos de simplicidade, decidi colocar aqui todos os métodos http de manipulação dos endpoints do API
    public login(user: String, pass: String): Observable<boolean> {
        return this.request('post', 'login',  {'email' : user, 'password' : pass});
    }
  
    public saveTeacher(teacher : any) : Observable<any> {
        return this.http.post<any>(API_URL + '/teachers', teacher);
    }

    public sendFaults(faultsObject : any) : Observable<any> {
        return this.http.post<any>(API_URL + '/faltas', {'faultsObject' : faultsObject});
    }

    public getAllStudentsFromClass(classURL : String) : any {
        return this.request('get', classURL);
    }

    public getThisTeachersSubjects(teacherAndClassCode : String) : any {
        return this.request('get', teacherAndClassCode);
    }

    public getThisClassTeacher(classURL : String) : any {
        return this.request('get', classURL);
    }

    // -->> esta chamada é crucial para determinar qual modal mostrar em cada estudante
    public getClassGrade(classURL : String) : any {
        return this.request('get', classURL);
    }
    
    public getThisClassFaults(classURL) : any {
        return this.request('get', classURL);
    }

    public getClassGrades(classURL) : any {
        return this.request('get', classURL);   
    }

    public getThisClassSubjects(classURL : String) : any {
        return this.request('get', classURL);
    }

    public getAllCourses() : any {
        return this.request('get', '/cursos');
    }

    public getAllClasses() : any {
        return this.request('get', '/classes');
    }

    public getAllStudents() {
        return this.request('get', '/students');
    }

    public getThisTeacherClasses(teacherCode : String) {
        return this.request('get', teacherCode);
    }

    public createClass(courseName : ClassModel) : Observable<ClassModel> {
        return this.request('post', '/turmas');
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
