
import {wolstore} from '../../../js/lstore.js';
import {RewardsMembership} from './vg-membership.js';
import {FlatRateBook} from './flbook.js';
import {sysdom,prsdom,wodom,fbdom,dashdom} from './ticket-dom.js';

export var srvwo = (wo=null)=>{
  if(!wo){wo = {};}
  return {
    num:wo.num || '',
    name:wo.name||'',
    address:wo.address||'',
    book:{
      name:wo.name||'Res Book',
      pl:wo.pl||'STA',
    },
    reg:wo.reg||'STA',
    cntrct:wo.cntrct||'PREMIUM',
    hascntrct:wo.hascntrct||false,
    build:{
      regprice:wo.regprice||0,
      memprice:wo.memprice||0,
      savings:wo.savings||0,
      memonth:wo.memonth||0,
    },
    systems:wo.systems||[]
  }
}

export class ServiceWO extends FlatRateBook{
  constructor(wo=null){
    let cleanwo=srvwo(wo);
    super(cleanwo.book.name,cleanwo.book.pl);
    this.wo = cleanwo;
    this.rewardform = new RewardsMembership(this.wo.memform);
    this.wo.memform = this.rewardform.form;

    document.getElementById(sysdom.input.tagid).addEventListener('change', (ele) => {//Add new system
        this.ADDsystem({
            id: ele.target.value
        });
        ele.target.value = '';
    });

    document.addEventListener('change', (ele) => {  //Document CHANGE
        this.wo = this.GETwo();
        console.log(this.wo);
        this.SAVEwo();
        //update in wo list / or add
        this.SETpresent();
    });

    document.getElementById(prsdom.button.open).addEventListener('click',(ele)=>{ // button to open the presentation
        if($(document.getElementById(sysdom.cont)).is(':visible')){
          $(document.getElementById(sysdom.cont)).hide();
        }else{$(document.getElementById(sysdom.cont)).show()}
        this.wo = this.GETwo();
        console.log(this.wo);
        this.SETpresent();
    });

    document.getElementById(fbdom.search.pl).addEventListener('change', (ele) => {
        let cname = document.getElementById(prsdom.contract.form.name);

        if(this.rewardform.ISmember(ele.target.value)){
          cname.value ='';
        }else{
          if(cname.value == ''){cname.value = 'PREMIUM';} //reintialize the contract
        }

        this.getSearchList(ele);
    });

    this.LOADwo(this.wo);
  }

  GETwo = () => {//Get WO from display
      let memlevel = document.getElementById(prsdom.contract.form.name).value;
      let nwo = {
          num: document.getElementById(wodom.info.num).value,
          name: document.getElementById(wodom.info.name).value,
          address: document.getElementById(wodom.info.address).value,
          book: {
              name: document.getElementById(fbdom.search.book).value,
              pl: document.getElementById(fbdom.search.pl).value
          },
          reg: this.GETregpl(document.getElementById(fbdom.search.pl).value),
          cntrct: this.rewardform.GETcntrctpl(document.getElementById(prsdom.contract.form.name).value) || 'PRE',
          hascntrct: this.rewardform.ISmember(document.getElementById(fbdom.search.pl).value), //NEED to account for contract upgrade
          memform: this.rewardform.form,
          build:{
            regprice:0,
            memprice:0,
            savings:0,
            memmonth:this.rewardform.GETformprice(12) //can change '12' to match the payment schedule
          },
          // presentation!!
          systems: this.GETsystems()
      }
      return nwo
  }

  /*  Set the presentation with a current wo
  */
  SETpresent = () => {
      if (this.wo.systems != null) {
          let slist = document.getElementById(prsdom.systems);

          let rprice=0; //temp for reg book price
          let mprice=0; //temp for mem book price
          slist.innerHTML = '';

          for (let x = 0; x < this.wo.systems.length; x++) {
              let s = slist.appendChild(document.createElement('div'));
              s.classList.add(prsdom.system.cont);
              s.appendChild(document.createElement('div')).innerText = this.wo.systems[x].id;
              let rlist = s.appendChild(document.createElement('div'));
              rlist.classList.add(prsdom.system.repairs);

              for (let y = 0; y < this.wo.systems[x].repairs.length; y++) {
                  rprice = 0;
                  mprice = 0;
                  //tell what column repcost goes to

                  //find the memebership cost (if any)

                  //fill the difference
                  let r = rlist.appendChild(document.createElement('div'));

                  r.classList.add(prsdom.system.repair.cont);
                  r.appendChild(document.createElement('div')).innerText = this.wo.systems[x].repairs[y].desc;

                  rprice = this.GETbookprice(this.wo.systems[x].repairs[y].task,this.wo.reg);
                  r.appendChild(document.createElement('div')).innerText =  rprice;
                  this.wo.build.regprice += (this.wo.systems[x].repairs[y].appr ? rprice : 0);

                  if(this.wo.systems[x].repairs[y].task=='DIAG'){ //special case for diagnostic fee
                    if(this.wo.hascntrct){
                      mprice = this.GETbookprice(this.wo.systems[x].repairs[y].task,this.wo.cntrct);
                    }else{mprice = this.GETbookprice(this.wo.systems[x].repairs[y].task,this.wo.reg);}
                  }else{mprice = this.GETbookprice(this.wo.systems[x].repairs[y].task,this.wo.cntrct);}

                  r.appendChild(document.createElement('div')).innerText = mprice;
                  this.wo.build.memprice += (this.wo.systems[x].repairs[y].appr ? mprice : 0);
                  r.appendChild(document.createElement('div')).innerText = rprice - mprice;
                  this.wo.build.savings += (this.wo.systems[x].repairs[y].appr ? rprice - mprice :0);

                  if(!this.wo.systems[x].repairs[y].appr){
                    r.classList.add(prsdom.system.repair.unapproved);
                  }
                  r.appendChild(document.createElement('div')).innerText = this.wo.systems[x].repairs[y].appr ? 'YES':'NO';
              }
          }
          document.getElementById(prsdom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(prsdom.contract.form.name).value) || this.wo.cntrct;
          document.getElementById(prsdom.invest.regprice).innerText = this.wo.build.regprice;
          document.getElementById(prsdom.invest.memprice).innerText = this.wo.build.memprice;
          document.getElementById(prsdom.invest.savings).innerText = this.wo.build.savings;
          document.getElementById(prsdom.invest.conmonth).innerText = this.rewardform.GETformprice();
      }
  }

}

export var SETUPbuild = (curwo)=>{
  //Tag ID CHANGE, adds a system to the list
  document.getElementById(sysdom.input.tagid).addEventListener('change', (ele) => {
      ADDsystem({
          id: ele.target.value
      });
      ele.target.value = '';
  });


  document.addEventListener('change', (ele) => {  //Document CHANGE
      curwo = GETwo(curwo);
      console.log(curwo);
      localStorage.setItem(wolstore.currentwo,JSON.stringify(curwo));
      SAVEwo(curwo);
      //update in wo list / or add
      SETpresent(curwo);
  });

  document.getElementById(prsdom.button.open).addEventListener('click',(ele)=>{ // button to open the presentation
      if($(document.getElementById(sysdom.cont)).is(':visible')){
        $(document.getElementById(sysdom.cont)).hide();
      }else{$(document.getElementById(sysdom.cont)).show()}
      curwo = GETwo(curwo);
      console.log(curwo);
      SETpresent(curwo);
  });


}
