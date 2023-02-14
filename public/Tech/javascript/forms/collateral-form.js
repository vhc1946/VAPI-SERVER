import { VHCform } from "http://3.15.144.193/repo/tools/vhc-forms.js";



export class CollateralForm extends VHCform{
  constructor(cont,info){
    super({
      cont:cont,
      content:info.content,
      dom:info.dom
    });
    //loop through info.dom.info
  }
}
