import { awo } from "/repo/ds/wos/vogel-wos.js";
import { aservicecontract } from "/repo/ds/contracts/vogel-servicecontracts.js";
import { aservicetrack } from "/repo/ds/tracking/vogel-servicetracking.js";

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
