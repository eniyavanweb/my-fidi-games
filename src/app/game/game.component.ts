import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
employee: any;
employeeName:string;
employeeAddress:string;
description:string;
message:string;

constructor(public crudservice:CrudService){}
ngOnInit() {
  this.crudservice.get_Allemployee().subscribe(data => {

    this.employee = data.map(e => {
      return {
        id: e.payload.doc.id,
        isedit: false,
        game: e.payload.doc.data()['name'],
        url: e.payload.doc.data()['address'],
        description: e.payload.doc.data()['description']
        
      };
    })
    console.log(this.employee);

  });
}

CreateRecord()
{
  let Record = {};
  Record['name'] = this.employeeName;
  Record['address'] = this.employeeAddress;
  Record['description'] = this.description;

  this.crudservice.create_Newemployee(Record).then(res => {

      this.employeeName = "";
      this.employeeAddress ="";
      this.description ="";
      console.log(res);
      this.message = "Game Added";
  }).catch(error => {
    console.log(error);
  });
  
}

}
