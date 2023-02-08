import {wolstore} from '/Tech/store/lstore.js';
import * as titlebar from 'https://www.vhpportal.com/repo/modules/vg-titlebar.js';
import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';

import {SYNCticket, STARTticket} from '/Tech/javascript/tools/vapi-FTrequest.js';
import {ServiceTicket} from '/Tech/javascript/controllers/ticket/service-ticket.js';
import {ServicePresentation} from '/Tech/javascript/controllers/ticket/service-presentation.js';


let publicfolder = '/Tech/bin/css'; //not sure we need
// Load Data //

let fbstore = window.opener.datamart.fbstore;//fbstore holds connections to indexdb and an instance of ObjList

//console.log('FLATRATE BOOK >',fbstore.list.list);

// LOAD Ticket //
let currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));
//console.log('Currticket',currticket);
if(currticket){
  localStorage.setItem(wolstore.toloadwo,null);//clear temp storage
  localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));//save as last open
  DropNote('tr','WO found','green');
}else{DropNote('tr','WO not found','red');}
window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

window.TicketSaved = false;
window.SAVEticket = (final=false)=>{
  return new Promise((resolve,reject)=>{

    currticket = ticket.ticket;

    //console.log(currticket);
    DropNote('tr','Ticket is Saving...','green');

    if(final){}//save final to server

    window.opener.techwos.UPDATEstore(currticket).then(answr=>{
      if(answr) {
        DropNote('tr','Ticket WAS Saved','green');
        window.askToClose = false;
        window.TicketSaved = true;
        return resolve(currticket.wo.id);
      }
      else {
        DropNote('tr','Ticket was NOTSaved','yellow');
        return resolve(false)
      }
    });
  });
}

// Setup ticket view groups ////////////////////////////////////////////////////
//console.log(currticket);
let ticket = new ServiceTicket(currticket,fbstore.list);
let  presentation = new ServicePresentation(document.createElement('div'),currticket,fbstore.list.TRIMlist({book:'RES'}));

//Event listener for bottom tab buttons to hide repair table
ticket.view.buttons.children[0].addEventListener('click', (eve)=>{
  TOGGLErepairtable(true)
})
ticket.view.buttons.children[2].addEventListener('click', (eve)=>{
  TOGGLErepairtable(true)
})

document.title = "WO: " + ticket.ticket.wo.id; //Set window title to WO id

//From the saints at stackoverflow
window.askToClose = true;
window.onbeforeunload = function (e) {
    if(!window.askToClose) return null
    e = e || window.event;
    //old browsers
    if (e) {e.returnValue = 'Sure?';}
    //safari, chrome(chrome ignores text)
    return 'Sure?';
};

window.onunload = function (e) {
  if (window.opener.tabs[ticket.ticket.wo.id] == 1) {
    window.opener.tabs[ticket.ticket.wo.id] = 0
  }
}

// final summary
// Setup Page //


// Titlebar Setup ///////////////////////////////////////////////////////////
var qactions = {
  present:{
    id:'presentation-open',
    src:'https://www.vhpportal.com/repo/assets/icons/document-signed.png',
    title:'Presentation',
    onclick:(ele)=>{  // Presentation show/hide
      let box = document.getElementsByClassName('present-full-cont')[0];
      let tickcont = document.getElementById('ticket-build-container');
      if(box.style.left == "0px"){
        ticket.ticket = presentation.data;
        ticket.ticket.track.presented = true;
        box.style.left = "-5000px";
        console.log(ticket.ticket)
        if (presentation.SignatureShown) {
          presentation.SHOWsignature()
        }
      }
      else{
        presentation.SETpresent(ticket.ticket);  //pass to ticket
        ticket.port.checks.ORGANIZEsummary();
        box.style.left = "0px";
      }
    }
  }
};
var mactions = {
  save:{
    id:'wo-save-button',
    src:'https://www.vhpportal.com/repo/assets/icons/disk.png',
    title:'Save WO',
    ondblclick:(ele)=>{
      window.SAVEticket();
    }
  },
  refresh:{
    id:'wo-refresh-button',
    src:'https://www.vhpportal.com/repo/assets/icons/refresh.png',
    title:'Refresh WO',
    onclick:(ele)=>{   // Refresh info
      DropNote('tr','Ticket is Refreshing','green');
      SYNCticket(currticket.wo.id).then(
        sync=>{
          if(sync.wo){
            currticket.wo=sync.wo;
            ticket.ticket={wo:currticket.wo};
            DropNote('tr','Ticket is updated','green');
          } else {
            DropNote('tr','Ticket was NOT updated','yellow');
          }
        }
      );
    }
  }
};

titlebar.SETUPtitlebar({
  RROOT:'https://www.vhpportal.com/repo/',
  qacts:qactions,
  macts:mactions,
  login:false,
  home:()=>{window.opener.gohome(window);}
}); //login disabled

document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  DropNote('tr','Going home','yellow');
});
$(document.getElementById(titlebar.tbdom.page.settings)).hide();   //hide the settings section of title bar
$(document.getElementById(titlebar.tbdom.page.user)).hide();       //hide the user section of the title bar
////////////////////////////////////////////////////

/*Event listener which resets and closes repair table pop-up.*/
document.getElementsByClassName('min-page-hide-button')[0].addEventListener('click', (ele)=>{
  TOGGLErepairtable()
});
/*Event listener to minimize repair list pop-up.*/
document.getElementsByClassName('min-page-minimize-button')[0].addEventListener('click', (ele)=>{
  let style = window.getComputedStyle(document.getElementById('loginout-block'));

  //SHOW
  if (style.display == 'none') {
    $(document.getElementById('loginout-block')).show();
    document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
    document.getElementsByClassName('frbook-list')[0].style.display = "";
    document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
  } else {
  //HIDE
    $(document.getElementById('loginout-block')).hide();
    document.getElementsByClassName('min-page-cont')[0].id = "min-page-hide"
    document.getElementsByClassName('frbook-list')[0].style.display = "none";
    document.getElementsByClassName('min-page-minimize-button')[0].innerText = "+";
  }
});

var TOGGLErepairtable = (hide=undefined) => {
  document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
  document.getElementsByClassName('frbook-list')[0].style.display = "";
  if (hide != undefined && hide == true) {
    $(document.getElementsByClassName('min-page-cont')[0]).hide();
  } else {
    $(document.getElementsByClassName('min-page-cont')[0]).toggle();
  }
  document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
  $(document.getElementById('loginout-block')).hide();
}
/**
 * Attempting to set ticket.ticket and ticket.data. Setting ticket.ticket does not change the repairs in ticket
 * ticket.data will change but ticket.ticket will not. Have attempted running same code in the service ticket itself,
 * but still does not update.
 * Attempting to set ticket.ticket to currticket likewise has no effect
 * Setting this.ticket = this.data after setting this.data.repairs = newrepairs does not work either
 * Setting the repairs itself within the ticket likewise does not update
 */
window.UPDATErepairapproval = (data)=> {
  //console.log("TICKET:",ticket.ticket.repairs==data.repairs)
  ticket.ticket = data;

}
