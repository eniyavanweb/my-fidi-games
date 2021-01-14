import { Component,  OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: any;
  employeeName: string | undefined;
  employeeAddress: string | undefined;
  description: string | undefined;
  message: string | undefined;


  constructor(public crudservice: CrudService) { }



  ngOnInit() {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          ...e.payload.doc.data() as ['name'],
          ...e.payload.doc.data() as ['address'],
          ...e.payload.doc.data() as ['description']
        };
      })
      console.log(this.employee);

    });
  }
  EditRecord(Record: { isedit: any; editname: any; name: any; editdescription: any; description: any; editaddress: any; address: any; }) {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editdescription = Record.description;
    Record.editaddress = Record.address;
  }

  Updatarecord(recorddata: { editname: any; editaddress: any; editdescription: any; id: any; isedit: any; }) {
    let record = { 'name': recorddata.editname, 'address': recorddata.editaddress, 'description': recorddata.editdescription };
    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id: any) {
    this.crudservice.delete_employee(record_id);
  }

  goToUrl(url: any): void {
    window.open("" + url, "_blank");
  }

}

