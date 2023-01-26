/* Web Form

  constructor()
  PASS:
  - cont (this.cont):
    Container holding form

  - dom (this.dom):
    Holding any useful id/classes with in this.content. If dom is passed with a
    field property, this.fields will initialize in the constructorotherwise it
    is up to the user to set it after.

  - content (this.content):
    Needs to be legal html and ready to be inserted into a div in the constructor

  - data (this.data):
    Structure passed to maintain an uptodated version of what the form is
    represents. Properties in data that you want to be displayed in the form
    have to be mirrored in this.fields{}. There can be properties this.data that
    are not present in this.fields.

  - datamap (this.datamap):
    Function that creates a template of this.data and can be used to ensure
    desired objects are being produced. The only rules for the map are that it
    excepts an object and returns one. By default it is simply that.
*/
export class VHCform{
  constructor({
    cont=document.createElement('div'),
    dom={},
    content='',
    data={},
    datamap=(d)=>{return d;}
  })
  {
    this.cont=cont;
    this.content=content;
    this.dom=dom;
    this.content=content;

    this.cont.innerHTML=this.content;
    this.fields={};
    this.addfields(this.dom.fields||{});

    this.datamap=datamap;
    this.data=this.datamap(data);
    try{this.form=this.data;}
    catch{console.log('Form not INIT')}

  }
  set form(updates={}){
    let setformloop=(update,data,fields)=>{
      for(let u in update){
        if(data[u]){ //check if part of structure
          if(update[u].keys){
            if(update[u].keys.length!==0){setformloop(updata[u],data[u],fields[u])}
          }else{ // update data and field
            data[u]=update[u];
            try{
              if(fields[u]){
                switch(fields[u].tagName){
                  case 'INPUT':{fields[u].value=update[u]?update[u]:'';break;}
                  case 'TEXTAREA':{fields[u].value=update[u]?update[u]:'';break;}
                  case 'SELECT':{
                    //Loop through options to find a match
                    for (let i = 0; i < fields[u].options.length; i ++) {
                      if (fields[u].options[i].value == update[u]) {
                        fields[u].options[i].selected = true;
                        break;
                      }
                    }
                    break;
                  
                  }
                  default:{fields[u].innerText = update[u]?update[u]:'';}
                }
              }
            }catch{console.log(`${u} is not setup in the form`)}
          }
        }
      }
    }
    setformloop(updates,this.data,this.fields);
  }

  get form(){
    let getformloop=(data,fields)=>{
      for(let u in fields){
        if(fields[u]){
          if(fields[u].keys){
            if(fields[u].keys.length===0){return getformloop(data[u],fields[u]);}
          }else{
            try{
              switch(fields[u].tagName){
                case 'INPUT':{data[u]=fields[u].value;break;}
                case 'TEXTAREA':{data[u]=fields[u].value;break;}
                case 'SELECT':{data[u]=fields[u][fields[u].selectedIndex].value;break;}
                default:{data[u]=fields[u].innerText;break;}
            }
            }catch{console.log(`${u} failed to get from form`);}
          }
        }
      }
      return this.data;
    }
    return getformloop(this.data,this.fields);
  }

  validate(){return true;}
  submit(){return this.validate()?this.form:null}

  addfields(fields){
    for(let f in fields){
      try{
        this.fields[f]=this.cont.getElementsByClassName(fields[f])[0];
      }
      catch{console.log(`Class ${f} is not declared in Form ${this.cont} it has been left out of this.inputs`)}
    }
  }
}
