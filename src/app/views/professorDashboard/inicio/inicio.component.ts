import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  {

  public userInfor : any;

  constructor(private dataInterface : DataModelInterface) {
    this.userInfor = this.dataInterface.parseJwt(this.dataInterface.getToken());
  }

}
