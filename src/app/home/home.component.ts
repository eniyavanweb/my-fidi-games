import { Component,  Input,  OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@Input() movieTitle: string | undefined;
	@Input() movieDescription: string | undefined;
	@Input() likesCount: number | any;
	@Input() isActive: boolean | undefined;



  employee: any;
  employeeName: string | undefined;
  employeeAddress: string | undefined;
  description: string | undefined;
  description2: Number | undefined;
  description3: Number | undefined;
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
          ...e.payload.doc.data() as ['description'],
          ...e.payload.doc.data() as ['description2'],
          ...e.payload.doc.data() as ['description2']
        };
      })
      console.log(this.employee);

    });
  }
  EditRecord(Record: { isedit: boolean; editname: any; name: any; editdescription: any; description: any; editdescription2: any; description2: any; editdescription3: any; description3: any; editaddress: any; address: any; }) {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editdescription = Record.description;
    Record.editdescription2 = Record.description2;
    Record.editdescription3 = Record.description3;
    Record.editaddress = Record.address;
  }

  Updatarecord(recorddata: { editname: any; editaddress: any; editdescription: any; editdescription2: any; editdescription3: any; id: string; isedit: boolean; }) {
    let record = { 'name': recorddata.editname, 'address': recorddata.editaddress, 'description': recorddata.editdescription, 'description2': recorddata.editdescription2, 'description3': recorddata.editdescription3 };
    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id: any) {
    this.crudservice.delete_employee(record_id);
  }

  goToUrl(url: any): void {
    window.open("" + url, "_blank");
  }

  onClick() {
		this.likesCount += (this.isActive) ? -1 : 1;
		this.isActive = !this.isActive;
	}

}

