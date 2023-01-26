
var STARTloadscreen=(cont=null,loadfun=null)=>{
  return new Promise((resolve,reject)=>{
    if(cont){
      $(cont).show();
      if(loadfun){
        loadfun().then(
          answr=>{
            $(cont).hide();
            return resolve(answr);
          }
        ).catch(err=>{return resolve(err);})
        return resolve(loadfun);
      }
    }else{return resolve(false);}
  });
}

export{
  STARTloadscreen
}
