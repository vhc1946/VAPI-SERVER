import {VHCform} from '../../repo/tools/vhc-forms.js';
import {DropNote} from '../../repo/modules/vg-dropnote.js';

const logurl = 'https://18.191.134.244:5000/login';//'https://localHost:5000/login'; //

let dom ={
  cont:'login-box',
  info:'login-info',
  fields:{
    user:'login-username',
    pswrd:'login-password'
  },
  actions:{
    submit:'login-submit',
    logout:'logiout-button',
    gotovapi:'gotovapi-button'
  }
}
const content =`
    <div id=${dom.cont}>
    <div id=${dom.info}>
        <label>User</label><input class=${dom.fields.user} type="text"/>
        <label>Password</label><input class=${dom.fields.pswrd} type="password"/>
        <div class = "action-buttons-div">
          <div class = "login-action-button" id=${dom.actions.submit} class="flat-action-button">SUBMIT</div>
          <div class = "login-action-button" id=${dom.actions.logout} class="flat-action-button">LOGOUT</div>
          <img id="${dom.actions.gotovapi}" src="bin/repo/assets/icons/badge.png" />
        </div>
    </div>
    </div>
`
const datamap = (u)=>{
  if(!u){u={}}
  return{
    user:u.user||'',
    pswrd:u.pswrd||'',
  }
}
export class LoginForm extends VHCform{
    constructor(cont,logieve=()=>{},logoeve=()=>{}){
        super({
          cont:cont,
          dom:dom,
          content:content,
          data:datamap(),
          datamap:datamap
        });
        this.permission=false;

        this.data = this.storecreds;
        if(this.data && this.data.user!=''||this.data.pswrd!=''){
          this.form=this.data;
          this.submit().then(
            result=>{
            if(result.success){
                this.permission=true;
                $(this.cont).hide();
                logieve(this.storecreds);
            }
            else{this.form=undefined;}//reset form
              this.storecreds=this.form;//store result
            }
        )
        }else{this.storecreds=undefined}

        document.getElementById(this.dom.actions.submit).addEventListener("click",(ele)=>{
          document.getElementsByClassName('login-username')[0].value = document.getElementsByClassName('login-username')[0].value.toUpperCase()
          this.submit().then(
              result=>{
              if(result.success){
                  DropNote('tr','Logged in','green');
                  this.permission=true;
                  $(this.cont).hide();
                  logieve(this.storecreds);
              }else{//login failed
                  DropNote('tr','User or Password Failed','yellow');
                  this.permission=false;
                  this.form={user:"",pswrd:""};//reset form
              }
              this.storecreds=this.form;//reset store
              }
          )
        });
        document.getElementById(this.dom.actions.logout).addEventListener("click",(ele)=>{
          this.form = undefined;
          this.storecreds = this.form;
          logoeve();//do passed down event
        });
        document.getElementById(this.dom.actions.gotovapi).addEventListener('click',(ele)=>{
          window.open('https://18.191.134.244:5000/');
        });
        for(let i in this.inputs){
        this.inputs[i].addEventListener('keypress',(eve)=>{
            if(eve.key == 'Enter'){document.getElementById(this.dom.actions.submit).click();};
        });
        }
    }

    get storecreds(){
        try{
          let creds=JSON.parse(localStorage.getItem('vapi-user'));
          if(creds){return creds;}
          else{return this.datamap();}
        }catch{return this.datamap();}
    }
    set storecreds(creds=this.datamap()){localStorage.setItem('vapi-user',JSON.stringify(creds))}

    validate(){
        let frm = this.form;
        if(frm.user!=''||frm.pswrd!=''){return true;}
        else{return false;}
    }
    submit(){
      console.log('here');
      return new Promise((resolve,reject)=>{
      let {user,pswrd} = this.form;
      this.storecreds=this.form;
      if(user!=''||pswrd!=''){
          var options={
          method:'POST',
          headers:{
            'Accept':'application/json'
          },
          body:JSON.stringify({access:{user:user,pswrd:pswrd}})
          }
          fetch(logurl,options)
          .then(response=>{return response.json()})
          .then(data=>{return resolve(data);})
          .catch(err=>{console.log(err);})
      }else{return resolve({success:false});}
      });
    }
}
