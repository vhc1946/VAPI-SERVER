import { awo } from "../wos/vogel-wos.js";
import { aservicecontract } from "../contracts/vogel-servicecontracts.js";
import { aservicetrack } from "../tracking/vogel-servicetracking.js";
import { aservicefinal } from "../final/vogel-servicefinal.js";

var aserviceticket=(st={})=>{
  if(!st){st={};}
  return{
    id:st.id||'',
    mobile:st.mobile||false,
    tech:st.tech||'',

    wo:awo(st.wo),
    contract:aservicecontract(st.contract),
    track:aservicetrack(st.track),
    checks:st.checks||{},
    sitems:st.sitems||[],
    repairs:st.repairs||[]
  }
}

export {
  awo, aservicecontract, aserviceticket
}
