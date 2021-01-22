import { Component,  Input,  OnInit } from '@angular/core';
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
  minumcount: any | undefined;
  maximum: any | undefined;
  message: string | undefined;
  imgurl:string | undefined;


  


  constructor(public crudservice: CrudService) { }



  ngOnInit() {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          ...e.payload.doc.data() as ['name'],
          ...e.payload.doc.data() as ['address'],
          ...e.payload.doc.data() as ['imgurl'],
          ...e.payload.doc.data() as ['description'],
          ...e.payload.doc.data() as ['minumcount'],
          ...e.payload.doc.data() as ['maximum'],

        };
      })
      console.log(this.employee);

    });
  }

  
  CreateRecord() {
    let Record = { 'name': this.employeeName, 'address': this.employeeAddress, 'description': this.description, 'minumcount': this.minumcount, 'maximum': this.maximum, 'imgurl': this.imgurl };


    this.crudservice.create_Newemployee(Record).then(res => {

      this.employeeName = "";
      this.employeeAddress = "";
      this.imgurl = "";
      this.description = "";
      this.minumcount = "";
      this.maximum = "";
      console.log(res);
      this.message = "Game Added";
    }).catch(error => {
      console.log(error);
    });

  }


  EditRecord(Record: { isedit: boolean; editname: any; name: any; editdescription: any; description: any; editimgurl: any; imgurl: any; editminumcount: any; minumcount: any; editmaximum: any; maximum: any; editaddress: any; address: any; editlike: any; }) {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editdescription = Record.description;
    Record.editimgurl = Record.imgurl;
    Record.editminumcount = Record.minumcount;
    Record.editmaximum = Record.maximum;
    Record.editaddress = Record.address;

  }

  Updatarecord(recorddata: { editname: any; editaddress: any; editdescription: any; editimgurl: any; editminumcount: any; editmaximum: any;  id: string; isedit: boolean; }) {
    let record = { 'name': recorddata.editname, 'address': recorddata.editaddress, 'description': recorddata.editdescription, 'imgurl': recorddata.editimgurl, 'minumcount': recorddata.editminumcount, 'maximum': recorddata.editmaximum };
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
