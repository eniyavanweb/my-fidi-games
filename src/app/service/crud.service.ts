import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  gameuser: any;
  delete_game(record_id: any) {
    throw new Error('Method not implemented.');
  }
  object(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(public fireservices:AngularFirestore) { }

  create_Gameusers(Record: unknown)
  {
    return this.fireservices.collection('Games').add(Record);
  }

  get_gameusers()
  {
    return this.fireservices.collection('Games',ref => ref.where('isUnderReview','==',true) ).snapshotChanges();
  }

  update_game(recordid: string, record: Partial<unknown>)
  {
    this.fireservices.doc('Games/' + recordid).update(record);
  }

  delete_mygame(record_id: string)
  {
    this.fireservices.doc('Games/' + record_id).delete();
  }

  like(col:any){
    this.fireservices.doc('Game/').update(col);
  }

}
