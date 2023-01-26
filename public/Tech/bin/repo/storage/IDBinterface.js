
import{ObjList} from '../tools/vg-lists.js';

export class IDBinterface{
  constructor(db,store,dbsetup=()=>{}){
    this.db;
    this.store=store;
    this.ready=false;
    this.list=null;

    let request = indexedDB.open(db);

    request.onerror=(eve)=>{
      this.db=null;
      console.log(eve);
    }
    request.onupgradeneeded=(eve)=>{
      console.log('upgrade');
      dbsetup(eve.target.result);
    }
    request.onsuccess=(eve)=>{
      console.log('onsuccess')
      this.db=eve.target.result;
      this.GETstore().then(
        list=>{
          if(list.list.length!=0){this.ready=true}
          this.list=list;
        }
      )
    }
  }

  ISready(timein=0){
    return new Promise((resolve,reject)=>{
      if(timein===0){timein=new Date().getTime();}
      setTimeout(()=>{
        if(this.ready||this.list){return resolve(true);}
        else{
          if(timein<(new Date().getTime()-10000)){return resolve(false)}
          else{return resolve(this.ISready(timein))}
        }
      },1);
    })
  }
  APPENDstore(item,key){
    return new Promise((resolve,reject)=>{
      let aitem = this.list.TRIMlist({[key]:item[key]});
      if(aitem.length!=0){}
      let trans=this.db.transaction(this.store,'readwrite').objectStore(this.store);
    });
  }
  FLUSHstore(){
    return new Promise((resolve,reject)=>{
      let trans=this.db.transaction(this.store,'readwrite').objectStore(this.store);
      trans.clear().onsuccess=(eve)=>{
        for(let x=1,l=this.list.list.length;x<l;x++){trans.add(this.list.list[x])}
        return resolve(true);
      }
    });
  }
  GETstore(){
    return new Promise((resolve,reject)=>{
      this.db.transaction(this.store,'readwrite').objectStore(this.store).getAll().onsuccess=(eve)=>{
        return resolve(new ObjList(eve.target.result));
      }
    });
  }
}
