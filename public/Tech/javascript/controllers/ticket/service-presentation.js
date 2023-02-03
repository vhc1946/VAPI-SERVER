import { DrawingPad } from '../../tools/drawing-pad.js';
import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import {ServicePricing} from './service-pricing.js';
import {ContractWSform} from '../../forms/contract-ws-form.js';
//arepair

//aservicepresentation(){}
export class ServicePresentation{
  constructor(cont,data,pricebook){
    this.cont = cont;
    this.cont.innerHTML=this.contents;
    this.data = data; //ticket data
    this.pricebook = new ServicePricing(pricebook); //ticket book
    this.conform = new ContractWSform(this.data.wo.pl);
    this.final = {} //Final compact ticket object to be passed to collateral
    this.SignatureShown = false;

    this.cont.getElementsByClassName(this.dom.head)[0].appendChild(this.conform.cont);

    //Event listener for change of contract form
    this.conform.cont.addEventListener('change',(ele)=>{
      //console.log('update pricing on presentation');

      let price = this.conform.GETformprice(1);

      //Update price in paymeny form
      document.getElementById('wo-present-contract-monthly').innerText = price;
      //Update price object in final
      this.final.monthlymem = price;

      //Hide the signature and reset the box
      if (this.SignatureShown) {
        this.SHOWsignature();
      }

      //Update membership label
      let oldLevel = document.getElementsByClassName('memlevel-label')[0].innerText;
      let newLevel = this.conform.pricelevel;
      if (oldLevel != newLevel) {
        document.getElementsByClassName('memlevel-label')[0].innerText = this.conform.pricelevel;
        this.contract = this.conform.pricelevel.slice(0, 3)
        this.UPDATEsitems(this.data)
      }
    });

    this.contract=this.data.wo.pricelevel;
    this.SETpresent(this.data);
    document.getElementsByClassName('memlevel-label')[0].innerText = this.contract

    //Check AHR price box if set to After Hours
    if (this.pricebook.pl == "AHR") {
      document.getElementById('pl-check').checked = true;
    }

    /*Setup + listeners for approve buttons.*/
    document.getElementsByClassName(this.dom.sig)[0].style.left = '-5000px'; //For first run
    document.getElementById(this.dom.buttons.appreg).addEventListener('click',(eve)=>{
      this.SHOWsignature(false);
      //update this.data.repairs with regular (STA | AHR) prices
      this.UPDATEticketrepairs(this.pricebook.pl)
      this.final.total = Number(document.getElementById("wo-present-regprice-today").innerText);
      this.final.savings = 0;
    });
    document.getElementById(this.dom.buttons.appmem).addEventListener('click',(eve)=>{
      this.SHOWsignature(true);
      //update this.data.repairs with regular (CLA | PRE | ULT) prices
      this.UPDATEticketrepairs(this.contract);
      //Update final object price and savings
      this.final.total = Number(document.getElementById("wo-present-memprice-today").innerText);
      this.final.savings = Number(document.getElementById("wo-present-savings-today").innerText);
    });

    //Event listener for change of PL
    document.getElementById('pl-check').addEventListener('change', (eve)=>{
      if (eve.target.checked == true) {
        this.pricebook.pl = "AHR";
      } else {
        this.pricebook.pl = "STA";
      }
      this.UPDATEsitems(this.data)
    })

    //Event listener for show/hide of PL popup
    document.getElementById('price-select').addEventListener('click', (eve)=>{
      let plcont = document.getElementById('pl-popup');
      if (plcont.style.display == "grid") {
        plcont.style.display = "none"
      } else {
        plcont.style.display = "grid"
      }
    })

    //setup signature pad
    this.sigpad = new DrawingPad(document.getElementsByClassName('signature-pad')[0]);
    document.getElementsByClassName('sig-clear')[0].addEventListener('click', (ele)=>{
      this.sigpad.clearPad();
    });
    /*Open collateral on signature save.*/
    document.getElementsByClassName('sig-save')[0].addEventListener('click', (ele)=>{
      window.signature = this.sigpad.getPainting();
      if(this.sigpad.signed){
        //Set and store final object on window.
        this.final.wo = this.data.wo;
        this.final.repairs = this.data.repairs;
        this.final.contract = this.conform.GETcontract();
        this.final.track = this.data.track;
        this.final.checks = this.data.checks;
        window.data = this.final;
        window.sitems = this.data.sitems;
        window.ticket = this.data;
        window.memberprice = document.getElementById("wo-present-memprice-today").innerText;
        window.regprice = document.getElementById("wo-present-regprice-today").innerText;
        window.presentation = this.cont.cloneNode(true);
        window.open("../controllers/collateral.html");
      }else{DropNote('tr','Please Sign','yellow')}
    });
  }

  dom = {
    cont: 'present-full-cont',
    head: 'present-header-cont',
    info:{
      customername:'present-info-contactname',
      street:'present-info-street',
      cityzip:'present-info-cityzip',
      contactphone:'present-info-contactphone',
      custcode:'present-info-custcode',
      id:'present-info-id'   // wonum
    },

    //contract: cntrctform, //from vg-membership.js

    body: 'present-bottom-cont',

    memlevel:'wo-present-membership',
    systems: 'wo-present-systems',
    system: {   //Most of this is generated by JS
      cont: 'wo-present-system',
      id: 'wo-present-system-id',
      repairs: 'wo-present-system-repairs',
      specials:{
        diagnostic:'wo-present-repair-diagnostic'
      },
      repair: {
        unapproved:'wo-present-repair-unapproved',
        cont: 'wo-present-repair',
        num: 'present-repair-num',
        desc: 'present-repair-desc',
        invst: 'present-repair-price',
        savings: 'present-repair-savings',
        appr: 'present-repair-appr'
      }
    },
    invest: {
      discsavings:'wo-present-discount-savings',
      savings: 'wo-present-savings-today',
      regprice: 'wo-present-regprice-today',
      memprice: 'wo-present-memprice-today',
      conmonth: 'wo-present-contract-monthly'
    },
    buttons:{
      open:'button-open-presentation',
      appreg: 'present-approval-regular',
      appmem: 'present-approval-membership'
    },
    sig: 'wo-present-signature'
  }

  contents=`
  <div class="${this.dom.cont}">
        <div class="${this.dom.head}">
            <div class="wo-contact-cont">
                <img src="https://www.vhpportal.com/repo/assets/images/Header_clean_transparent.png" id="header-logo" alt="VOGEL">
                <div class="${this.dom.info.customername}">Client Name</div>
                <div class="${this.dom.info.custcode}">CUSTCODE</div>
                <div class="${this.dom.info.street}">1234 Street Dr</div>
                <div class="${this.dom.info.id}">wonum</div>
                <div class="${this.dom.info.cityzip}">Fenton, MO 63026</div>
                <div class="${this.dom.info.contactphone}">Phone Number</div>
            </div>
        </div>

        <div class="${this.dom.body}">
            <div id="wo-present-repair-cont">
                <div class="${this.dom.system.repair.cont}">
                    <div class="ignore">Pricing</div>
                    <div class="ignore">Premium</div>
                    <div class = "memlevel-label" id="${this.dom.memlevel}"></div>
                    <a href="https://www.vogelhvac.co/" target="_blank" id="membership-link">Sign Up for Your Membership!</a>
                </div>
                <div class = "mini-popup" id = "pl-popup">
                    <div>After Hours</div>
                    <input type = "checkbox" id = "pl-check"></input>
                </div>
                <div class="wo-present-headers">
                    <div>Services & Repairs</div>
                    <div id = "price-select">Regular</div>
                    <div id = "member-label">Member</div>
                    <div>Savings</div>
                    <div>Approval</div>
                </div>


                <div id="wo-present-repair-diagnostic" class="${this.dom.system.repair.cont}" style="display:none">

                    <div class="${this.dom.system.repair.desc}">Diagnostic</div>
                    <div class="${this.dom.system.repair.invst}"></div>
                    <div></div>
                    <div class="${this.dom.system.repair.savings}"></div>
                    <div>YES</div>
                </div>

                <div id="wo-present-systems">
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Due Today</div>
                <div id="${this.dom.invest.regprice}"></div>
                <div id="${this.dom.invest.memprice}" class = "member-price"></div>
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Savings Today</div>
                <div id = "${this.dom.invest.discsavings}">0</div>
                <div id="${this.dom.invest.savings}" class = "member-savings"></div>
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Monthly Membership</div>
                <div class="ignore"></div>
                <div id="${this.dom.invest.conmonth}" class = "member-month">0</div>
            </div>
            <div class="button-row">
                <label></label>
                <div id="${this.dom.buttons.appreg}">Approve</div>
                <div id="${this.dom.buttons.appmem}">Approve</div>
            </div>
            <div class="${this.dom.sig}">
                <canvas class="signature-pad"></canvas>
                <div class="signature-buttons">
                  <div class="flat-action-button sig-clear">Clear</div>
                  <div class="flat-action-button sig-save">Proceed</div>
                </div>
            </div>
        </div>

    </div>
  `

  SETpresent = (wodata) => {
    //console.log('To Present > ',wodata);
    //Use to maintain the state of the pricelevel on the presentation
    let oldpricelevel = this.contract
    this.data = wodata;
    this.data.wo.pricelevel = oldpricelevel
    this.data.contract = oldpricelevel
    //Update WO info
    for(let i in this.dom.info){
      this.cont.getElementsByClassName(this.dom.info[i])[0].innerText = this.data.wo[i];
    }

    //Update price level
    this.conform.pricelevel = this.conform.GETmemhead(this.data.wo.pricelevel);
    //Check if document is loaded for first run of presentation generation
    this.conform.UPDATEselect();
    this.contract = this.data.wo.pricelevel;
    if (this.contract == "STA" || this.contract == "AHR" || this.contract == "STD") {
      this.contract = "PRE"
    }
    //Update repair items
    this.UPDATEsitems();
    window.repairtable = document.getElementById('wo-present-systems').cloneNode(true);
    window.contractopt = document.getElementsByClassName('present-contract-opts')[0];
  }

  SHOWsignature=(IsMember)=>{
    let box = document.getElementsByClassName(this.dom.sig)[0];
    this.sigpad.clearPad();
    if(box.style.left == "0px"){
      this.SignatureShown = false;
      box.style.left = "-5000px";
      document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--BCE-green)";
      document.getElementById(this.dom.buttons.appreg).innerText = "Approve"
      document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--BCE-green)";
      document.getElementById(this.dom.buttons.appmem).innerText = "Approve"
    }
    else{
      this.SignatureShown = true;
      box.style.left = "0px";
      if (IsMember) {
        document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--vogel-red)";
        document.getElementById(this.dom.buttons.appreg).innerText = "Decline"
      } else {
        document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--vogel-red)";
        document.getElementById(this.dom.buttons.appmem).innerText = "Decline"
      }
    }
  }

  UPDATEsitems = () => {
    //console.log("WODATA:::::::::", wodata)
    if (this.data.sitems != null) {
      document.body.appendChild(this.cont);  // Creates presentation
      //document.getElementsByClassName(this.dom.head)[0].appendChild(document.createElement('div')).innerHTML = cfcontent; // Appends Contract Form within presentation

      let slist = document.getElementById(this.dom.systems);

      let rprice=0; //item reg price
      let mprice=0; //item member price

      let trprice=0; //total reg price
      let tmprice=0; //total member price
      let savings=0; //total savings
      let discsavings=0; //discount savings

      slist.innerHTML = '';

      for (let x = 0; x < this.data.sitems.length; x++) {  // Sets each system
        if(this.data.repairs[x]!=undefined && this.data.repairs[x].length!==0){//only display if repairs
          //Add system label div
          let sysgroup = document.createElement('div');
          sysgroup.id = "system-label-group";

          let s = slist.appendChild(document.createElement('div'));
          s.classList.add(this.dom.system.cont);
          sysgroup.appendChild(document.createElement('div')).innerText = this.data.sitems[x].tagid; //This creates the actual label
          sysgroup.lastChild.className = "system-label"

          //Add blank column div
          let membgdiv = sysgroup.appendChild(document.createElement('div'));
          membgdiv.id = "member-blank-column";

          s.appendChild(sysgroup)

          //Add repair list
          let rlist = s.appendChild(document.createElement('div'));
          rlist.classList.add(this.dom.system.repairs);

          for (let y = 0; y < this.data.repairs[x].length; y++) {  // Sets each repair for given system
            rprice = (this.data.repairs[x][y].task!='OTH'?this.pricebook.GETbookprice(this.data.repairs[x][y].task):Number(this.data.repairs[x][y].price)) * this.data.repairs[x][y].qty;
            mprice = 0;

            let r = rlist.appendChild(document.createElement('div'));

            r.classList.add(this.dom.system.repair.cont);
            r.appendChild(document.createElement('div')).innerText = this.data.repairs[x][y].descr + " (" + this.data.repairs[x][y].qty + ")";

            r.appendChild(document.createElement('div')).innerText =  rprice;
            trprice += (this.data.repairs[x][y].appr ? rprice : 0);

            if(this.data.repairs[x][y].task!='OTH'){
              if(this.data.repairs[x][y].task=='DIAG'){ //special case for diagnostic fee
                if(this.data.contract && Object.keys(this.data.contract).length!==0){
                  mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task,this.contract);
                }else{mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task);}
              }else{mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task,this.contract);}
            }else{
              mprice = Number(this.data.repairs[x][y].price);
            }
            mprice = mprice * this.data.repairs[x][y].qty
            r.appendChild(document.createElement('div')).innerText = mprice;
            tmprice += (this.data.repairs[x][y].appr ? mprice : 0);
            r.lastChild.id = "member-item-label";
            r.appendChild(document.createElement('div')).innerText = rprice - mprice;
            savings += (this.data.repairs[x][y].appr ? rprice - mprice :0);

            if(!this.data.repairs[x][y].appr){
              r.classList.add(this.dom.system.repair.unapproved);
            }

            //Add to disc savings
            if (mprice < 0 && rprice < 0 && this.data.repairs[x][y].appr == true) {
              discsavings = discsavings + mprice
              r.lastChild.innerText = -mprice
            }

            //Approval div
            let apprdiv = document.createElement('div');
            r.appendChild(apprdiv).innerText = this.data.repairs[x][y].appr ? 'YES':'NO';
            apprdiv.className = "apprvdiv"
            apprdiv.classList.add(apprdiv.innerText)
            /**
             *  Event listener for approving repairs on repair table
             * */
            apprdiv.addEventListener('click', (eve)=>{
              this.data.repairs[x][y].appr = !this.data.repairs[x][y].appr;
              apprdiv.innerText = this.data.repairs[x][y].appr ? 'YES':'NO';
              apprdiv.className = "apprvdiv"
              apprdiv.classList.add(apprdiv.innerText)
              if(!this.data.repairs[x][y].appr){
                r.classList.add(this.dom.system.repair.unapproved);
              } else {
                r.classList.remove(this.dom.system.repair.unapproved);
              }

              //Update total price
              this.UPDATEtotalprice()

              //Hide the signature and reset the box
              if (this.SignatureShown) {
                this.SHOWsignature();
              }
            })
          }
        }
      }
      //document.getElementById(this.dom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(this.dom.contract.form.name).value) || this.wo.cntrct;
      document.getElementById(this.dom.invest.regprice).innerText = trprice;
      document.getElementById(this.dom.invest.memprice).innerText = tmprice;
      document.getElementById(this.dom.invest.savings).innerText = savings + (-discsavings);
      document.getElementById(this.dom.invest.discsavings).innerText = -discsavings
      //document.getElementById(this.dom.invest.conmonth).innerText = this.rewardform.GETformprice();
    }
  }

  UPDATEtotalprice = () => {
    let rprice=0; //item reg price
    let mprice=0; //item member price

    let trprice=0; //total reg price
    let tmprice=0; //total member price
    let savings=0; //total savings
    let discsavings=0; //discount savings

    //Loop through each repair, calculating the price and updating the price variable
    for (let x = 0; x < this.data.repairs.length; x++) {
      for (let y = 0; y < this.data.repairs[x].length; y++) {
        //Set base prices for each item
        rprice = (this.data.repairs[x][y].task!='OTH'?this.pricebook.GETbookprice(this.data.repairs[x][y].task):Number(this.data.repairs[x][y].price)) * this.data.repairs[x][y].qty;
        mprice = 0;

        //Get the price of the member item
        if(this.data.repairs[x][y].task!='OTH'){
          if(this.data.repairs[x][y].task=='DIAG'){ //special case for diagnostic fee
            if(this.data.contract && Object.keys(this.data.contract).length!==0){
              mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task,this.contract);
            }else{mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task);}
          }else{mprice = this.pricebook.GETbookprice(this.data.repairs[x][y].task,this.contract);}
        }else{mprice = Number(this.data.repairs[x][y].price);}
        mprice = mprice * this.data.repairs[x][y].qty

        //Calculate any discounts applied by the tech
        if (mprice < 0 && rprice < 0 && this.data.repairs[x][y].appr == true) {
          discsavings = discsavings + mprice
        }

        //Calculate totals
        tmprice += (this.data.repairs[x][y].appr ? mprice : 0);
        savings += (this.data.repairs[x][y].appr ? rprice - mprice :0);
        trprice += (this.data.repairs[x][y].appr ? rprice : 0);
      }
    }

    if (trprice < 0) {trprice = 0}
    if (tmprice < 0) {tmprice = 0}

    document.getElementById(this.dom.invest.regprice).innerText = trprice;
    document.getElementById(this.dom.invest.memprice).innerText = tmprice;
    document.getElementById(this.dom.invest.savings).innerText = savings + (-discsavings);
    document.getElementById(this.dom.invest.discsavings).innerText = discsavings
  }

  /**
   * Loops through each repair item and updates its price from the price book, using the given repair level
   * Saves to the ticket object
   * @param {*price level} pl 
   */
  UPDATEticketrepairs = (pl=null, appr=null) => {
    for (let i = 0; i < this.data.repairs.length; i++) {
      let item = this.data.repairs[i];
      for (let j = 0; j < item.length; j++) {
        let repair = item[j]
        if (pl != null) {
          repair.price = this.pricebook.GETbookprice(repair.task, pl)
          repair.pl = pl;
        }
        if (appr != null) {
          repair.appr = appr;
        }        
      }
    }

  }
}
