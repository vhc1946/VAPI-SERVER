
import {DropNote} from '../repo/modules/vg-dropnote.js';
import * as gendis from '../repo/modules/vg-tables.js';
import * as vcontrol from '../repo/layouts/view-controller.js';
vcontrol.SETUPviewcontroller('../bin/repo/');
import { aserviceticket, awo, aservicecontract } from '../repo/ds/tickets/vogel-serviceticket.js';

import {TicketServiceItems} from './service-items.js';

import {ServiceChecks} from './service-checks.js';
import {FlatRateTable} from '../tables/fbook-table.js';

import {VHCform} from '../repo/tools/vhc-forms.js';

import {woform} from '../forms/wo-form.js';
import {conform} from '../forms/contract-form.js';

/* A Residential Ticket

  Parts:
  - customer
  - wo
  - serviceitems - class TicketSITab
  - contracts
  - checklists

  SERVICEITEMS
  Parts for every item:
  - info
  - repairs


  TODO::
  - move Flatrate table to inside serive items
  - give drop list to filtering
  - finalize ticket structure
  - finish set ticket(), take from contructor
*/

var fbtable = document.getElementsByClassName('frbook-list')[0];

export class ServiceTicket{
  constructor(ticket=null,pricing){
    console.log('INIT Ticket',ticket);
    this.data = aserviceticket(ticket);
    console.log("DATA:::", this.data)
    // Setup Price Book
    this.pricing = new FlatRateTable(pricing.TRIMlist({book:this.data.wo.pricebook}),fbtable);
    this.pricing.fltrs.pl=this.data.wo.pricelevel;
    this.pricing.SETrepairlist();

    this.view=new vcontrol.ViewGroup({
      cont:document.getElementById('ticket-build-container'),
      type:'mbe'
    });

    if(this.data){
      //do a check on this.ticket
      //Set Tracking ID to WO id
      this.data.track.id = this.data.wo.id
      this.data.track.tech = this.data.tech
    }else{
      console.log('NO Ticket');
      //load blank ticket
    }

    this.port={
      info:new vcontrol.ViewGroup({
        type:'mtr'
      }),
      sitems:new TicketServiceItems(this.data.sitems,this.data.repairs,this.pricing),
      checks:new ServiceChecks(this.data.checks)
    };

    this.forms={//hold the list of children data forms
      wo:new VHCform({
        dom:woform.dom,
        content:woform.content,
        data:this.data.wo
      }),//WOform(document.createElement('div')),
      contract:new VHCform({
        dom:conform.dom,
        content:conform.content,
        data:this.data.contract
      }),//Contform(document.createElement('div')),
      sitems:[],
      checks:[]
    };

    this.view.ADDview('Information',this.port.info.cont);
    this.view.ADDview('Service Items',this.port.sitems.view.cont);
    this.view.ADDview('Check Lists',this.port.checks.view.cont);

    this.port.info.cont.id = "info-cont";

    this.port.info.ADDview('WO',this.forms.wo.cont);
    this.port.info.ADDview('Contract',this.forms.contract.cont);
    $(this.port.info.buttons.children[0]).click();

    $(this.view.buttons.children[0]).click();  //Sets first tab as selected

    this.ticket = this.data;

    this.forms.wo.form = this.data.wo;
    this.forms.contract.form = this.data.contract;

    this.forms.sitems = this.port.sitems.info
    this.forms.repairs = this.port.sitems.repairs
    this.forms.checks = this.port.checks.forms

    this.port.info.cont.getElementsByClassName('wo-info-pricelevel')[0].addEventListener('change',(ele)=>{
      this.UPDATEpricing(ele.target.value);
    });
  }

  get ticket(){ //updates this.data and returns it
    let ttick={};
    //console.log("From get ticket: ", this.data);
    for(let f in this.forms){
      //try{
        if(this.forms[f].form){
          this.data[f]=this.forms[f].form; //load ticket part from form
        }
        else{
          this.data[f]=[];
          for(let x=0;x<this.forms[f].length;x++){
            //Check if forms[f][x] is a dictionary - if so, save in a dictionary structure
            if (this.forms[f][x].constructor == Object) {
              this.data[f].push({})
              for (let key in this.forms[f][x]) {
                //Check if key or name
                if (key == "name") {
                  this.data[f][this.data[f].length-1][key] = this.forms[f][x][key];
                } else if (key == "checks") {
                  //Loop through each checklist
                  this.data[f][this.data[f].length-1].checks = {};
                  for (let cl in this.forms[f][x].checks) {
                    this.data[f][this.data[f].length-1].checks[cl] = this.forms[f][x].checks[cl].form;
                  }
                }
              }
            } else {
              this.data[f].push(this.forms[f][x].form)
            }
          }
        }
      //}
      //catch{}
    }
    return this.data
  }

  set ticket(tick={}){//loads forms and updates this.data
    for(let f in tick){
      if(this.forms[f]){
        if(!this.forms[f].length){
          this.forms[f].form=tick[f];
          this.data[f]=tick[f];
        }else{
          for(let x=0;x<tick[f].length;x++){
            //Check if dictionary or array
            if (this.tick[f][x].constructor == Object) {
              for (let key in this.tick[f][x]) {
                //Load basic data if name, otherwise load form of each checklist
                if (key == "name") {
                  this.forms[f][x][key] = tick[f][tick[f].length-1][key];
                }else if (key == "checks") {
                  for (let cl in this.tick[f][x].checks) {
                    this.forms[f][x].checks[cl].form = tick[f][tick[f].length-1].checks[cl]
                  }
                }
              }
            } else {
              this.forms[f][x].form=tick[f][x];
              this.data[f]=tick[f];
            }
          }
        }
      }
    }
  }

  /**
   * Update the price level of the current ticket and reflect changes in ticket form
   */
  UPDATEpricing(plevel) {
    if(plevel&&plevel!=''){this.pricing.GETfilters({pl:plevel})}
    else{DropNote('tr','Choose a Correct Price Level');}
  }
}
