import {wolstore} from './store/lstore.js';
import {DropNote} from './repo/modules/vg-dropnote.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import * as viewcontrol from './repo/layouts/view-controller.js';
import { SELECTview } from './repo/modules/vg-floatviews.js';
import { AppDock } from './repo/modules/appdock.js';
import {FormList} from './repo/tools/vhc-formlist.js';

import {STARTticket} from './tools/vapi-FTrequest.js';

import * as manlist from './store/tech-managelist.js';
import {SENDrequestapi,SENDrequestadmin} from './repo/apis/vapi/vapicore.js';
import {STARTloadscreen} from './repo/tools/vhc-loadscreen.js';

import {twdashlist,twolist, REMOVErow}from './tables/techwo-table.js';

import { aserviceticket } from './repo/ds/tickets/vogel-serviceticket.js';

window.name="ftdash";
window.gohome=function(win){win.open('',window.name);}//window.loaction.reload();

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

STARTloadscreen(document.getElementsByClassName('vhc-load-screen')[0],()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      return resolve(true);
    },4000);
  });
}).then(answr=>{console.log(answr);})




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
manlist.INITmanagelist().then(
  mlist=>{
    datamart=mlist;
    window.datamart=datamart; //can be used in child windows
    console.log('Done With list',datamart)
    //post needed updates to manage list
  }
)

var qactions = {
  new:{
    id:'search-wo',
    src:'./bin/repo/assets/icons/search.png',
    alt:'SEARCH',
    title:'Search WO',
    onclick:(ele)=>{SELECTview(document.getElementById('wo-center'),'Open WO');}
  },
  email:{
    id:'test-email',
    src:'./bin/repo/assets/icons/Resources.png',
    onclick:(ele)=>{
      SENDrequestapi({to:'christianv@vogelheating.com',subject:'TEST'},'MAIL').then(
        answer=>{console.log(answer);}
      );
    }
  }
};
window.techwos=twolist;
window.twdashlist = twdashlist;
window.removerow = REMOVErow;

var mactions = {
  datalist:{
    id:'refresh-datalist',
    src:'./bin/repo/assets/icons/datastores.png',
    ondblclick:(ele)=>{
      DropNote('tr','Syncing Data','green')
      manlist.REFRESHmanagelist().then(
        list=>{
          console.log(list);
          DropNote('tr','Syncing has Finished','green');
        }
      )
    }
  }
};
var login = titlebar.SETUPtitlebar({
  RROOT:'./bin/repo/',
  qacts:qactions,
  macts:mactions,
  login:true,
  logieve:(creds)=>{ //on login
    twolist.REFRESHstore(creds.user).then(res=>{if(res){twdashlist.LOADlist(twolist.list);}})
  },
  logoeve:()=>{// on logout
    DropNote('tr','Logging Out','green');window.location.replace('../index.html')
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
          console.log(result);
          twdashlist.LOADlist(twolist.list);
        }
      );
      localStorage.setItem(wolstore.toloadwo,JSON.stringify(wo));
      window.open('controllers/ticket.html');
    }
    let wonum = document.getElementById('openwo-number').value;
    while(wonum.length < 8){wonum = '0' + wonum;}
    let woitem = twolist.GETitem(wonum);
    if(woitem){
      savenload(woitem);
    }else{
      //search vapi mart
      twolist.CHECKmart(wonum).then(
        found=>{
          console.log('TICKET >',found);
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
