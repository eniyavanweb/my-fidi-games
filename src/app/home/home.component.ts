import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: any;
  employeeName: string;
  employeeAddress: string;
  description:string;
  message: string;


  constructor(public crudservice: CrudService) { }

  

  ngOnInit() {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data()['name'],
          address: e.payload.doc.data()['address'],
          description:e.payload.doc.data()['description']
        };
      })
      console.log(this.employee);

    });
  }
  EditRecord(Record)
  {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editdescription = Record.description;
    Record.editaddress = Record.address;
  }

  Updatarecord(recorddata)
  {
    let record = {};
    record['name'] = recorddata.editname;
    record['address'] = recorddata.editaddress;
    record['description'] =recorddata.editdescription;
    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id)
  {
    this.crudservice.delete_employee(record_id);
  }

}
