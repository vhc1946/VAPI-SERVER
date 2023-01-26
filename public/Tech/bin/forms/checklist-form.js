import {VHCform} from '../repo/tools/vhc-forms.js';

export class CheckListForm extends VHCform{
  constructor(cont,content,config){
    super({
      cont:cont,
      content:content,
      dom:config
    });
    console.log(config);

    this.include = true;
    this.valids = config.valids || {}; //describe any input validation rules

    this.cont.addEventListener('change',(ele)=>{
      console.log(this.form);
    });
  }
}
