import { CreateComponent } from "../tools/vhc-components.js";

/* FIND parentNode
    Usually used in events to ensure the event belongs to the correct element
*/
var FINDparentele=(ele,stop)=>{
  if(ele.classList.contains(stop)||ele==document.body){
    if(ele!=document.body){return ele}
    else{return null}
  }else{return FINDparentele(ele.parentNode,stop);}
}

/////////////////////

//  Setup Module ///////////////////////////////////////////////////////////////
var SETUPviewcontroller=(pfolder)=>{
  pubfolder=pfolder;
  for(let x=0,l=stylesheets.length;x<l;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',`${pubfolder}css/${stylesheets[x]}`);
    document.getElementsByTagName('head')[0].prepend(viewstyles);

  }
}

//  PATHS //
var stylesheets = ['vg-viewcontrols.css'];
var assets={
  viewclose:'https://18.191.134.244:5000/assets/icons/cross.png'
}
var pubfolder = ''
/////////////////////////////////////////////////////////////////////////////////

var vcdom={   //  DOM names
  cont:'viewcontrol-cont',
  menu:{
    cont:'viewcontrol-menu',
    button:'viewcontrol-menu-item',
    selected:'viewcontrol-menu-selected',
    qactions:'viewcontrol-quick-actions',
    qactionbuttons:'viewcontrol-actionbutton'
  },
  port:{
    cont:'viewcontrol-port',
    view:'viewcontrol-port-item',
    selected:'viewcontrol-port-selected'
  },
  util:{
    close:'viewcontrol-port-close'
  }
}

var vdom = (rroot='')=>{
  return{
    [`.${vcdom.cont}.div`]:{
      attributes:{},
      children:{
        [`.${vcdom.menu.cont}.div`]:{
          attributes:{},
          children:{
            '.viewcontrol-menubox.div':{
              attributes:{},
              children: null
            },
            [`.${vcdom.menu.qactions}.div`]:{
              attributes:{},
              children: null
            }
          }
        },
        [`.${vcdom.port.cont}.div`]:{
          attributes:{},
          children: null
        }
      }
    }
  }
}

var vcgroup={//STYLE GROUPS
  mtr:{ //menu top right
    cont:'viewcontrol-cont-vt',
    menu:{
      cont:'viewcontrol-menu-hmr'
    }
  },
  mtl:{ //menu top left
    cont:'viewcontrol-cont-vt',
    menu:{
      cont:'viewcontrol-menu-hml'
    }
  },
  mbe:{ //menu bottom even
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:'viewcontrol-menu-hm'
    }
  },
  mbr:{ //menu bottom right
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:'viewcontrol-menu-hmr'
    }
  },
  mbl:{ //menu bottom left
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:'viewcontrol-menu-hml'
    }
  },
  mre:{ //menu right even
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vm'
    }
  },
  mrt:{ //menu right top
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vmt'
    }
  },
  mrb:{ //menu right bottom
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vmb'
    }
  },
  mle:{ //menu left even
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vm'
    }
  },
  mlt:{ //menu left top
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vmt'
    }
  },
  mlb:{ //menu left bottom
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vmb'
    }
  }
}

//  PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////
/* Initialize a set of views
    Will take a container and setup anything found in its first child, so nested
    views will not be setup
*/
class ViewGroup{
  constructor({
    cont=document.createElement('div'),
    type='',
    style=null,
    delEve=()=>{},
    swtchEve=()=>{},
    qactions={}
  }){
    this.cont=cont;
    this.group=CreateComponent(vdom());
    this.cont.appendChild(this.group);

    this.port=this.group.getElementsByClassName(vcdom.port.cont)[0];
    this.menu=this.group.getElementsByClassName(vcdom.menu.cont)[0];
    this.buttons=this.menu.children[0]; //to get navigation menu
    this.ADDqactions(qactions);
    if(vcgroup[type]!=undefined){this.SETUPviewgroup(type);}

    this.swtchEve=swtchEve;
    this.delEve=delEve;
  }

  /* ADD a view
      PASS:
      - name - name of view
      - view - html collection to add to view
      - cont - name of container holding the tnv views and nav
  */
  ADDview(name,view,del=false){
    try{this.RESETviews();}
    catch{
      console.log('Container id:',this.group.id,' May NOT Exist...');
      return null;
    }
    let fview = this.FINDview(name);
    if(!fview){//does not exist
      view.title=name;
      view.classList.add(vcdom.port.view,vcdom.port.selected);
      this.port.appendChild(view);
      var button = document.createElement('div');//create tab button and add
      button.innerText = name
      button.title = name; //change to .title
      button.classList.add(vcdom.menu.button,vcdom.menu.selected);

      button.addEventListener('click',(ele)=>{
        if(ele.target.classList.contains(vcdom.menu.button)){
          this.SWITCHview(view,ele.target);
        }
      });
      if(del){
        button.appendChild(document.createElement('img')).src =assets.viewclose;
        button.lastChild.classList.add(vcdom.util.close);
        button.lastChild.addEventListener('dblclick',(ele)=>{
          let butt=FINDparentele(ele.target,vcdom.menu.button);
          if(butt){
            console.log('Closing view..');
            this.delEve(); //optional delete process
            this.REMOVEview(butt);
          }
        });
      }
      this.buttons.appendChild(button);

      return view;
    }else{
      console.log('does exist')
      //open the found view

      this.FINDbutton(name).click();
      return null;
    }
  }

  ADDqactions(qacts){
    try{
      this.group.getElementsByClassName(vcdom.menu.qactions)[0].appendChild(CreateComponent(qacts));
    }catch{console.log('Could not add quick actions')}
  }

  /* Remove the Selected tab
    Set as a click listener in tab button

    Deletes the selected tab button and
    the associated view
  */
  REMOVEview(button){
    var reset = false;
    if(button.classList.contains(vcdom.menu.selected)){reset=true}

    this.port.removeChild(this.FINDview(button.title));
    this.buttons.removeChild(button);

    if(reset){
      try{this.port.children[this.port.children.length-1].classList.add(vcdom.port.selected);}catch{}
      try{this.buttons.children[this.menu.children.length-1].classList.add(vcdom.menu.selected);}catch{}
      if(this.port.children.length==0){ //add default view
        //port.appendChild(document.createElement('div'));
        //port.lastChild.innerText = 'SELECT VIEW';
        //port.lastChild.classList.add(vcdom.port.selected);
      }
    }
  }

  /* Reset the views
      Will return the port and menu to default (no menu OR port items selected)
  */
  RESETviews(){
    let buttons = this.menu.getElementsByClassName(vcdom.menu.selected);
    let views = this.port.children;
    for(let x=0;x<buttons.length;x++){buttons[x].classList.remove(vcdom.menu.selected);}
    for(let x=0;x<views.length;x++){views[x].classList.remove(vcdom.port.selected);}
  }

  /* Search for a port in a container
      Loops through the ports of a container and tries to match the ports.title
      with the name passed.
  */
  FINDview(name){
    let views = this.port.children;
    for(let x=0;x<views.length;x++){if(views[x].title==name){return views[x]}}
    return null;
  }

  FINDbutton(name){
    let buts = this.buttons.children;
    for(let x=0;x<buts.length;x++){
      if(buts[x].title===name){return buts[x]}
    }
    return null;
  }

  SWITCHview(view,button){
    this.RESETviews();
    button.classList.add(vcdom.menu.selected);
    view.classList.add(vcdom.port.selected);
    this.swtchEve(this.cont,view,button);//optional switch function
  }

  SETUPviewgroup(grp){
    this.group.classList.add(vcgroup[grp].cont);
    this.menu.classList.add(vcgroup[grp].menu.cont);
  }

  CLEARview(){
    this.menu.children[0].innerHTML='';
    this.port.innerHTML = '';
  }
}

export {
  vcdom,
  FINDparentele,
  SETUPviewcontroller,
  ViewGroup
};
