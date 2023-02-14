import {SENDrequestapi} from 'https://www.vhpportal.com/repo/apis/vapi/vapicore.js';

import {wolstore} from '/Tech/store/lstore.js';

import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import * as titlebar from 'https://www.vhpportal.com/repo/modules/vg-titlebar.js';
import { SELECTview } from 'https://www.vhpportal.com/repo/modules/vg-floatviews.js';
import { AppDock } from 'https://www.vhpportal.com/repo/modules/appdock.js';
import {STARTloadscreen} from 'https://www.vhpportal.com/repo/tools/vhc-loadscreen.js';


import {STARTticket} from '/Tech/javascript/tools/vapi-FTrequest.js';
import * as manlist from '/Tech/store/tech-managelist.js';
import {twdashlist,twolist}from '/Tech/javascript/tables/techwo-table.js';


window.name="ftdash";
window.gohome=function(win){win.open('',window.name);}//window.loaction.reload();
window.refreshDash = (wonum)=>{
  twolist.REFRESHstore(login.storecreds.user).then(res=>{
  twdashlist.form = twolist.list;
  });
}

/*  Tech Dash

  TODO:
  - manage list
  - better oraganize dash into modules that reflect the app dock
  - rotate quick actions depending on module
  - provide editable tech information
  - sleep function that shows date and time on gray screen. Save ticket and clear
    memory. Restart on mouse move.
  - move "home"
*/


var dashdom = {
  cont:'vg-wo-dash',
  buttons:{
    editToggle:'tech-wo-selector'
  },
  list:{
    cont:'vg-wo-list',
    item:{
      cont:'vg-wo-item',
      num:'vg-wo-item-num',
      name:'vg-wo-item-name',
      address:'vg-wo-item-address'
    }
  }
}

var datamart=null;



SENDrequestapi({},'LOGIN',{
  user:'MURRY',
  pswrd:'vogel123'
}).then(
  answr=>{console.log('TEST call',answr)}
)
STARTloadscreen(document.getElementsByClassName('vhc-load-screen')[0],()=>{
  return new Promise((resolve,reject)=>{
    manlist.INITmanagelist().then(
      mlist=>{
        datamart=mlist;
        window.datamart=datamart; //can be used in child windows
        //console.log('Done With list',datamart)
        //post needed updates to manage list
        return resolve(true);
      }
    )
  });
}).then(answr=>{console.log(answr);})



var qactions = {
  new:{
    id:'search-wo',
    src:'https://www.vhpportal.com/repo/assets/icons/search.png',
    alt:'SEARCH',
    title:'Search WO',
    onclick:(ele)=>{SELECTview(document.getElementById('wo-center'),'Open WO');}
  }
};
window.techwos=twolist;
window.twdashlist = twdashlist;
window.tabs = {};

var mactions = {
  datalist:{
    id:'refresh-datalist',
    src:'https://www.vhpportal.com/repo/assets/icons/datastores.png',
    ondblclick:(ele)=>{
      DropNote('tr','Syncing Data','green')
      manlist.REFRESHmanagelist().then(
        list=>{
          console.log(list); //Keeping this console log
          DropNote('tr','Syncing has Finished','green');
        }
      )
    }
  }
};
var login = titlebar.SETUPtitlebar({
  RROOT:'https://www.vhpportal.com/repo/',
  qacts:qactions,
  macts:mactions,
  login:true,
  logieve:(creds)=>{ //on login
    twolist.REFRESHstore(creds.user).then(res=>{if(res){twdashlist.LOADlist(twolist.list);}})
  },
  logoeve:()=>{// on logout
    DropNote('tr','Logging Out','green');window.location.replace('/')
  },
  home:(ele)=>{
      $(document.getElementById('vhc-app-dock')).show();
      $(document.getElementById('vg-wo-dash')).hide();
  }
});
//returns login Form
if(login.storecreds.user!=''){
  //console.log('LOGIN');
  //console.log(login.storecreds);
  twolist.REFRESHstore(login.storecreds.user).then(res=>{
  twdashlist.form = twolist.list;
  })
}

// Pre-load / Setup dash modules
//Load manage list on page load
document.addEventListener('DOMContentLoaded',(eve)=>{
  manlist.REFRESHmanagelist().then(
    list=>{
      console.log(list);
      //DropNote('tr','Syncing has Finished','green'); don't show dropnote so list is background loaded
    }
  )
})
// Work Order List Setup ////////////////////////////////////////////////////////

document.getElementById('openwo-number').addEventListener('keypress',(eve)=>{
    if(eve.key == 'Enter'){document.getElementById('submit-search').click();};
});
document.getElementById('submit-search').addEventListener('click', (ele)=>{
    let savenload = (wo)=>{
      twolist.UPDATEstore(wo).then(
        result=>{
          //console.log(result);
          twdashlist.LOADlist(twolist.list);
        }
      );
      if (window.tabs[wonum] == 1) {
        DropNote('tr',`WO # ${wonum} Already Open!`,'red')
      } else {
        //Add the woitem to the open tabs
        window.tabs[wonum] = 1;
        localStorage.setItem(wolstore.toloadwo,JSON.stringify(wo));
        window.open('/Tech/ticket');
      }
    }
    let wonum = document.getElementById('openwo-number').value;
    while(wonum.length < 8){wonum = '0' + wonum;}
    let woitem = twolist.GETitem(wonum);
    if(woitem){
      savenload(woitem);
    }else{
      DropNote('tr', 'Searching, please wait', 'yellow')
      //search vapi mart
      twolist.CHECKmart(wonum).then(
        found=>{
          //console.log('TICKET >',found);
          if(found){found.mobile=true;savenload(found);}
          else{
            STARTticket(wonum).then(  //'00025796'
                ticket=>{
                console.log('TICKET >',ticket);
                if(ticket){
                    ticket.id = wonum;//add an id
                    ticket.mobile=true; //add mobile
                    ticket.tech=login.storecreds.user; //add tech
                    DropNote('tr','Wo is Loading...','green');
                    savenload(ticket);
                }else{DropNote('tr','Wo Not Found','red');}
                }
            );
          }
        }
      )
    }
    $(document.getElementById('vg-float-frame-close')).click();
});

// App Dock Setup ///////////////////////////////////////////////////////////////
var dockapps={
    ['SPIFFs']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
    ['Work Orders']:(ele)=>{
        $(document.getElementById('vhc-app-dock')).hide();
        $(document.getElementById('vg-wo-dash')).show();
        //Show quick actions
        $(document.getElementById('search-wo').style.display = 'unset');
    },
    ['Performance']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
    ['Resources']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
}
var appdock = new AppDock(document.createElement('div'),dockapps);
document.body.appendChild(appdock.cont);
////////////////////////////////////////////////////////////////////////////////

// Tech Dash Navigation ////////////////////////////////////////////////////////
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{
    $(document.getElementById('vhc-app-dock')).show();
    $(document.getElementById('vg-wo-dash')).hide();
    //Hide quick actions
    $(document.getElementById('search-wo').style.display = 'none');
});
////////////////////////////////////////////////////////////////////////////////
