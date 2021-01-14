import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
employee: any;
employeeName:string | undefined;
employeeAddress:string | undefined;
description:string | undefined;
description2:string | undefined;
description3:string | undefined;
message:string | undefined;

constructor(public crudservice:CrudService){}
ngOnInit() {
  this.crudservice.get_Allemployee().subscribe(data => {

    this.employee = data.map(e => {
      return {
        id: e.payload.doc.id,
        isedit: false,
        ...e.payload.doc.data() as ['name'],
        ...e.payload.doc.data() as ['address'],
        ...e.payload.doc.data() as ['description'],
        ...e.payload.doc.data() as ['description2'],
        ...e.payload.doc.data() as ['description3']
        
      };
    })
    console.log(this.employee);

  });
}

CreateRecord()
{
  let Record = {'name': this.employeeName, 'address': this.employeeAddress, 'description':this.description, 'description2':this.description2, 'description3':this.description3};


  this.crudservice.create_Newemployee(Record).then(res => {

      this.employeeName = "";
      this.employeeAddress ="";
      this.description ="";
      this.description2 ="";
      this.description3 ="";
      console.log(res);
      this.message = "Game Added";
  }).catch(error => {
    console.log(error);
  });
  
}

}
