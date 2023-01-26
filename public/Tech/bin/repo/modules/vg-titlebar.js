import {CreateComponent} from '../tools/vhc-components.js';
import { LoginForm } from './vg-login-form.js';

//  PATHS //
var stylesheets = ['css/vg-titlebar.css'];

var tbdom={ // Titlebar
  cont:'titlebar-cont',
  title:'titlebar-title',
  window:{
    close:'titlebar-win-close',
    mini:'titlebar-win-mini',
    maxi:'titlebar-win-maxi'
  },
  more:{
    cont:'titlebar-moretools',
    actions:'titlebar-moretools-quick'
  },
  info:{
    cont:'titlebar-page-user-cont',
    username:'titlebar-username'
  },
  login:{
    cont:'loginout-block',
    form:'loginout-form',
    uname:'loginout-uname',
    pswrd:'loginout-pswrd',
    submit:'loginout-submit',
    help:'loginout-help'
  },
  page:{
    save:'titlebar-page-save',
    print:'titlebar-page-print',
    settings:'titlebar-page-settings',
    user:'titlebar-page-user'
  },
  utils:{
    buttons:{
      view:'titlbar-button-view',
      action:'titlebar-button-action',
      moretools:'titlebar-button-more',
      help:'titlebar-button-help',
      home:'titlebar-button-home'
    },
    groups:{
      right:'titlebar-cont-right',
      left:'titlebar-cont-left'
    }
  }
}

var tdom = (rroot='')=>{
  return{
    [`#${tbdom.cont}.div`]:{
      attributes:{
        class:'titlebar'
      },
      children:{
        [`#${tbdom.utils.groups.left}.div`]:{
          attributes:{},
          children:{
            [`#${tbdom.utils.buttons.home}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot + "assets/icons/V-Mark-red.png",
                alt: "HOME",
                title: "Home"
              },
              children: null
            },
            [`#${tbdom.more.cont}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot + "assets/icons/menu-burger.png",
                alt: "MORE",
                title: "More"
              },
              children: null
            },
            [`#${tbdom.more.actions}.div`]:{
              attributes:{
                style: "display:none"
              },
              children:null
            }
          }
        },
        [`#${tbdom.title}.div`]:{
          attributes:{
          },
          children:null
        },
        [`#${tbdom.utils.groups.right}.div`]:{
          attributes:{},
          children:{
            [`#${tbdom.info.cont}.span`]:{
              attributes:{},
              children:{
                [`#${tbdom.page.user}.img`]:{
                  attributes:{
                    class: "titlebar-button-action",
                    src: rroot + "assets/icons/user.png",
                    alt: "USER",
                    title: "Log Out"
                  },
                  children: null
                },
                [`#${tbdom.info.username}.span`]:{
                  attributes:{},
                  children:null
                }
              }
            },
            [`#${tbdom.login.cont}.div`]:{
              attributes:{},
              children:null
            },
            [`#${tbdom.utils.buttons.help}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot + "assets/icons/info.png",
                alt: "HELP",
                title: "help"
              },
              children: null
            }
          }
        }
      }
    }
  }
}

/* ADD actions to title bar
    Function to add an array of elements to the more actions portion
    of the title bar.
*/
var ADDmactions=(acts)=>{
  acts=CREATEactionbuttons(acts);
  for(let x=0;x<acts.length;x++){
    document.getElementById(tbdom.more.actions).appendChild(acts[x]);
  }
}

var ADDqactions=(acts)=>{
  acts=CREATEactionbuttons(acts);
  for(let x=0;x<acts.length;x++){
    document.getElementById(tbdom.utils.groups.left).appendChild(acts[x]); //refresh button
  }
}

let CREATEactionbuttons=(acts)=>{
  let alist = [];
  for(let ma in acts){
    alist.push(document.createElement('img'));
    if(ma.includes('spacer')){
      acts[ma]={src:'./bin/repo/assets/icons/minus.png',title: ''}
      alist[alist.length-1].classList.add('moretools-spacer');
    }
    alist[alist.length-1].classList.add(tbdom.utils.buttons.action);
    for(let as in acts[ma]){
      alist[alist.length-1][as]=acts[ma][as];
    }
  }
  return alist;
}
let SETUPtitlebar=({RROOT='',qacts={},macts={},login=true,logieve=()=>{},logoeve=()=>{},home=(ele)=>{}})=>{
  document.body.prepend(CreateComponent(tdom(RROOT))); //add titlebar to the body
  for(let x=0,l=stylesheets.length;x<l;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',RROOT+stylesheets[x]);
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }

  ADDqactions(qacts);
  ADDmactions(macts);

  document.getElementById(tbdom.more.cont).addEventListener('click',(ele)=>{  // Toggle More Options menu
    let moreele = document.getElementById(tbdom.more.actions);
    $(moreele).toggle();
  });
  document.getElementById(tbdom.utils.buttons.home).addEventListener('click',home);
  document.body.addEventListener('click',(ele)=>{
    let isinbar = (target,stop)=>{
      if(target.classList.contains(stop)||target==document.body){
        if(target!=document.body){return target}
        else{return null}
      }else{return isinbar(target.parentNode,stop);}
    }
    if(!isinbar(ele.target,'titlebar')){
      document.getElementById(tbdom.more.actions).style.display="none";
    }
  });

  if(login){
    document.getElementById(tbdom.page.user).addEventListener('click',(ele)=>{
      if($(document.getElementById(tbdom.login.cont)).is(":visible")){
        $(document.getElementById(tbdom.login.cont)).hide();
      }else{$(document.getElementById(tbdom.login.cont)).show()}
    });
    return new LoginForm(document.getElementById(tbdom.login.cont),logieve,logoeve);}
  else{$(document.getElementById(tbdom.login.cont)).hide();return null;}
}

export {
  tbdom,
  SETUPtitlebar
}
