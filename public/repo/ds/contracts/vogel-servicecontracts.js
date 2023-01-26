import {ExcelDateToJSDate} from '../../tools/xltools.js';

var aservicecontract = (sc=null)=>{
    if(!sc||sc==undefined){
        sc = {};
    }
    return{
        id:sc.id ||'', //ServiceContractNumber

        origid:sc.origid||'', //ContractNumberOriginal
        renewid:sc.renewid||'', //ContractNumberRenewed

        value:sc.value||'', //ContractValue

        type:sc.type||'', //ContractType
        cat:sc.cat||'', //SalesCategoryCode
        status:sc.status||'', //ContractStatus

        custcode:sc.custcode||'',//CustomerCode
        billto:sc.billto||'', //BillToCustomerCode

        billings : sc.billings||'', //NumberOfBillings
        visits:sc.visits||'', //NumberOfContractVisits

        datestart:sc.datestart||'', //OriginalContractDate

        datesign : sc.datesign||'', //ContractDate

        datefrom : sc.datefrom||'', //ContractDateFrom
        dateto : sc.dateto||'', //ContractDateTo
        sendrenew: sc.sendrenew||'', //SendRenewalDate

        createby:sc.createby ||'', //UserID
        createdate:sc.createdate||'', //CreatedDate
        createtime:sc.createtime||'' //CreatedTime
    }
}

var vjservicecontractmap=(vjsc)=>{
    if(!vjsc||vjsc==undefined){
        vjsc = {};
    }
    return{
        id:vjsc['current id']?String(vjsc['current id']):'', //this contract number (unique value)

        origid:vjsc['orginal id']?String(vjsc['orginal id']):'', //the first contract number
        renewid:vjsc['renew num ']?String(vjsc['renew num ']):'', //the last contract number

        value:vjsc['          value'] ||'',

        type:vjsc['type      ']?String(vjsc['type      ']):'', //describes contract
        cat:vjsc['cat       ']?String(vjsc['cat       ']):'', //reflect department
        status:vjsc['s'] ||'',

        custid:vjsc['cust code ']?String(vjsc['cust code ']):'',
        billto:vjsc['bill to   ']?String(vjsc['bill to   ']):'',

        billings : vjsc['   bill num'] ||'',

        signdate : ExcelDateToJSDate(vjsc['created ']),
        startdate : ExcelDateToJSDate(vjsc['period fro']),
        enddate : ExcelDateToJSDate(vjsc['period to ']),
        sendrenew: ExcelDateToJSDate(vjsc['send renew'])
    }
}

export {
    aservicecontract,
    vjservicecontractmap
}

/*
ARSubledgerCode: "AR"
AnnualContractValue: 288
ApplyTax1: "N"
ApplyTax2: "N"
BillingType: "P"
ContractDate: "2016-09-15T00:00:00Z"
ContractDateFrom: "2020-09-15T00:00:00Z"
ContractDateTo: "2021-09-14T00:00:00Z"
ContractNumberRenewed: "0001933-R1"
ContractStatus: "I"
ContractType: "C21MF"
ContractValue: 288
CustomerCode: "VOJO05"
CycleSetup: "N"
LastBilledDate: "2021-08-15T00:00:00Z"
LastInvoiceNumber: "   C005153"
LocationLine1: "4511 MAGNOLIA"
LocationLine3: "ST. LOUIS, MO 63110"
NumberOfBillings: "12"
NumberOfContractVisits: "2"
OriginalContractDate: "2016-09-15T00:00:00Z"
PhoneNumber1: "314-799-4760"
ReasonForInactiveOrHold: "Renewed Sep13/21"
RecognizedRevenueVisitBilled: "N"
SalesCategoryCode: "       300"
SendRenewalDate: "2021-08-01T00:00:00Z"
ServiceContractNumber: "0000001933"
ThisIsAMasterContract: "N"
WorkOrderCategory: "6"
*/
