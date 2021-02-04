import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gameuser: any;
  gamename: string | undefined;
  Address: string | undefined;
  description: string | undefined;
  minumcount: any | undefined;
  maximum: any | undefined;
  message: string | undefined;
  imgurl:string | undefined;
  like: any | number = 1;
  isUnderReview: boolean | undefined;


  constructor(public crudservice: CrudService) { }

  ngOnInit() {
    this.crudservice.get_gameusers().subscribe(data => {
      this.gameuser = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          isUnderReview: false,
          ...e.payload.doc.data() as ['name'],
          ...e.payload.doc.data() as ['address'],
          ...e.payload.doc.data() as ['imgurl'],
          ...e.payload.doc.data() as ['description'],
          ...e.payload.doc.data() as ['minumcount'],
          ...e.payload.doc.data() as ['maximum'],
          ...e.payload.doc.data() as ['like'],
        };
      })
      console.log(this.gameuser);
    }); 
  }
  CreateRecord() {
    let Record = { isUnderReview:false, 'name': this.gamename, 'address': this.Address, 'description': this.description, 'like':this.like, 'minumcount': this.minumcount, 'maximum': this.maximum, 'imgurl': this.imgurl };
    this.crudservice.create_Gameusers(Record).then(res => {
      this.gamename = "";
      this.Address = "";
      this.imgurl = "";
      this.description = "";
      this.like = "";
      this.minumcount = "";
      this.maximum = "";
      this.isUnderReview = false ;
      console.log(res);
      this.message = "Your game has been check and will be published";
    }).catch(error => {
      console.log(error);
    });
  }
  EditRecord(Record: { isedit: boolean; editgamename: any; name: any; editdescription: any; description: any; editimgurl: any; imgurl: any; editlike: any; like: any; editminumcount: any; minumcount: any; editmaximum: any; maximum: any; editaddress: any; address: any; editisUnderReview: any; isUnderReview: any; }) {
    Record.isedit = true;
    Record.editgamename = Record.name;
    Record.editdescription = Record.description;
    Record.editimgurl = Record.imgurl;
    Record.editlike = Record.like;
    Record.editminumcount = Record.minumcount;
    Record.editmaximum = Record.maximum;
    Record.editaddress = Record.address;
    Record.editisUnderReview = Record.isUnderReview;
  }
  Updatarecord(recorddata: { editgamename: any; editaddress: any; editdescription: any; editlike: any; editimgurl: any; editminumcount: any; editmaximum: any; id: string; isedit: boolean; }) {
    let record = { 'name': recorddata.editgamename, 'address': recorddata.editaddress, 'description': recorddata.editdescription, 'like':recorddata.editlike, 'imgurl': recorddata.editimgurl, 'minumcount': recorddata.editminumcount, 'maximum': recorddata.editmaximum };
    this.crudservice.update_game(recorddata.id, record);
    recorddata.isedit = false;
  }
  Updatarecordlike(recorddata: { id: string; like:any}) {

    let record = { 'like': recorddata.like +=1 };
    this.crudservice.update_game(recorddata.id, record);
  }
  Deletgame(record_id: any) {
    this.crudservice.delete_mygame(record_id);
  }
  goToUrl(url: any): void {
    window.open("" + url, "_blank");
  }
  likedata(col:any){
    let likedata = {'col': col.editlike}
    this.crudservice.like(col);
  }
}

