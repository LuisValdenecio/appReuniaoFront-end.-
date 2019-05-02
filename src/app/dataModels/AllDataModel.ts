export class LoginModel {
    email : String;
    password : String;
    constructor(email : String = "", password : String = ""){
        this.email = email;
        this.password = password;
    }
}

export class UserModel {
    nomeEsobreNome : String;
    email : String;
    password : String;

    constructor(nomeEsobreNome : String = "", email : String = "", password : String = "") {
        this.nomeEsobreNome = nomeEsobreNome;
        this.email = email;
        this.password = password;
    }
}

export class ClassModel {
    nomeClass : String;
    disciplinas : String[];

    constructor(nomeClass : String) {
        this.nomeClass = nomeClass;
        this.disciplinas = [];
    }

}