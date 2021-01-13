import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_Newemployee(Record: unknown)
  {
    return this.fireservices.collection('Games').add(Record);
  }

  get_Allemployee()
  {
    return this.fireservices.collection('Games').snapshotChanges();
  }

  update_employee(recordid: string, record: Partial<unknown>)
  {
    this.fireservices.doc('Games/' + recordid).update(record);
  }

  delete_employee(record_id: string)
  {
    this.fireservices.doc('Games/' + record_id).delete();
  }

  

}
