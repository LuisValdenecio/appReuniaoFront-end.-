import { Component } from '@angular/core';

@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent {

  private studentData : any[] = [
    {"name" : "Luis Valdenêncio Tchitue"},
    {"name" : "Isaías Fernando Chitue"},
    {"name" : "Bernadeth Constância"},
    {"name" : "Benvinda Maria"},
    {"name" : "José Fernando Tchitue"},
    {"name" : "Luciano Basílio Tchitue"},
    {"name" : "Angífer Bernada"},
    {"name" : "Angelina Adelaide Cinco Reis"},
    {"name" : "Luciano Basílio Tchitue"},
    {"name" : "Angífer Bernada"},
    {"name" : "Angelina Adelaide Cinco Reis"}
  ];
 

  constructor() { }
}
