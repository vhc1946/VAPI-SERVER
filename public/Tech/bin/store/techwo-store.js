
import {ObjList} from '../repo/tools/vg-lists.js';
import {SENDrequestapi} from '../repo/apis/vapi/vapicore.js';

/*
SENDrequestapi({
  collect:'apps',
  store:'VFT',
  db:'techwos',
  method:'query',
  options:{query:{tech:"VOGCH"}}
}).then(
  answr=>{console.log(answr);
  }
);
*/
export class TechLocalWos extends ObjList{
  constructor(list){
    super(list);
  }
  UPDATEstore(item){
    return new Promise((resolve,reject)=>{
      SENDrequestapi({
        collect:'apps',
        store:'VFT',
        db:'techwos',
        method:'query',
        options:{query:{id:item.id}}
      }).then(
        found=>{
          if(found.success&&found.body.result.length===1){
            SENDrequestapi({
              collect:'apps',
              store:'VFT',
              db:'techwos',
              method:'update',
              options:{
                query:{id:item.id},
                update:{$set:item},
                options:{}
              }
            }).then(answr=>{
              let success=false;
              if(!answr.body.result.err){success=true;}
              return resolve(success);
            })
          }
          else{
            SENDrequestapi({
              collect:'apps',
              store:'VFT',
              db:'techwos',
              method:'insert',
              options:{
                docs:item
              }
            }).then(answr=>{
              let success=false;
              if(!answr.body.result.err){success=true;}
              return resolve(success);
            })
          }
        }
      );
      if(this.TRIMlist({id:item.id}).length==0){this.list.unshift(item);}
      else{this.UPDATEitem(item);}
    });
  }
  UPDATEitem(item){
    let list = this.list.splice();
    for(let x=0;x<list.length;x++){
      if(list[x].id===item.id){
        list[x]=item;
        break;
      }
    }
    this.list=list;
  }
  GETitem(id){
    let woitem = this.TRIMlist({id:id});

    if(woitem.length==0){return null;}
    return woitem[0];
  }
  REFRESHstore(tech=undefined){
    return new Promise((resolve,reject)=>{
      SENDrequestapi({
        collect:'apps',
        store:'VFT',
        db:'techwos',
        method:'query',
        options:{query:{tech:tech,mobile:true}}
      }).then(
        answr=>{
          let success=false;
          if(answr.success){this.list=answr.body.result;success=true;}
          return resolve(success);
        }
      );
    });
  }
  REMOVEitem(id){
    let found = false;
    let tlist = [];
    for(let x=0;x<this.list.length;x++){
      if(this.list[x].id===id){
        this.list[x].mobile=false;
        SENDrequestapi({
            collect:'apps',
            store:'VFT',
            db:'techwos',
            method:'update',
            options:{
              query:{id:this.list[x].id},
              update:{$set:this.list[x]},
              options:{}
            }
        }).then(
          answr=>{
          }
        )
        found=true;
      }else{tlist.push(this.list[x])}
    }
    this.list=tlist;
    return found;
  }
  CHECKmart(id){
    return new Promise((resolve,reject)=>{
      SENDrequestapi({
        collect:'apps',
        store:'VFT',
        db:'techwos',
        method:'query',
        options:{query:{id:id}}
      }).then(
        result=>{
          if(result.success && result.body.result.length===1){
            return resolve(result.body.result[0])
          }else{return resolve(false);}
        }
      )
    })
  }
}
