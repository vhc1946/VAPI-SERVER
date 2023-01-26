
export var cntrctform = {
    cont: 'wo-present-contract-cont',
    form: {
        cont: 'present-contract-opts',
        memappr: 'wo-contract-appr',
        desc: 'present-contract-opt-desc',
        quantity: 'present-contract-opt-quantity',
        appr: 'present-contract-opt-appr',
        name: 'present-contract-name',
        month: 'present-contract-monthly',

        inputs: {
            sys: 'present-contract-addsys',
            comp: 'present-contract-addcomp',
            stdfltr: 'present-contract-addstdflt',
            spcfltr: 'present-contract-addspcflt',
            humpad: 'present-contract-addhumpad',
            timesave: 'present-contract-addtimesave'
        }
    }
}

export var prsdom = {
    cont: 'wo-presentation-cont',
    head: 'wo-presentaiton-header',
    button:{
      open:'button-open-presentation'
    },
    contract: cntrctform, //from vg-membership.js
    memlevel:'wo-present-membership',
    systems: 'wo-present-systems',
    system: {
        cont: 'wo-present-system',
        id: 'wo-present-system-id',
        repairs: 'wo-present-system-repairs',
        specials:{
          diagnostic:'wo-present-repair-diagnostic'
        },
        repair: {
            unapproved:'wo-present-repair-unapproved',
            cont: 'wo-present-repair',
            num: 'present-repair-num',
            desc: 'present-repair-desc',
            invst: 'present-repair-price',
            savings: 'present-repair-savings',
            appr: 'present-repair-appr'
        }
    },
    invest: {
        savings: 'wo-present-savings-today',
        regprice: 'wo-present-regprice-today',
        memprice: 'wo-present-memprice-today',
        conmonth: 'wo-present-contract-monthly'
    }
}





////////////////////////////////////////////////////////////////////////////////
export var wotabdom ={  //WO data from JONAS
  ARSubledgerCode:'ARCode',                //"AR",
  ApprovedForBillingDate:'ApprBillDate',   //"null"
  ArrivalDate:'ArrDate',                   //"2022-10-11T00:00:00Z"
  ArrivalTime:'ArrTime',                   //"1031"
  BillEquipment:'bEquip',                  //"D"
  BillLabour:'bLabor',                     //"D"
  BillMaterial:'bMats',                    //"D"
  BillOther:'bOther',                      //"D"
  BillTravel:'bTravel',                    //"D"
  BillType:'bType',                        //"F"
  CertifiedPayrollRequired:'CertPay',      //"N"
  CompletelyBilled:'CompBill',             //"N"
  ContactName:'ContactName',               //"TESTING"
  CustomerCode:'CustCode',                 //"*VOGMISC"
  DispatchDate:'dispDate',                 //"2022-10-11T00:00:00Z"
  DispatchEstimatedHours:'dispEstHours',   //2
  DispatchPriority:'dispPri',              //"10"
  DispatchTime:'dispTime',                 //"1031"
  EquipmentRateTable:'EquipRateTab',       //"MASTER"
  FederalTaxApplicable:'FedTax',           //"N"
  FinalCertifiedPayroll:'FinalCertPay',    //"N"
  FlatRateBook:'FRBook',                   //"RES"
  IncludeBillTo:'IncludeBT',               //"N"
  JobAddressLine1:'JobAddy1',              //"*123 VOGEL"
  LabourRateTable:'LabRateTab',            //"MASTER"
  MergeQuoteIntoPrepbill:'MergeQintoP',    //"N"
  MobileWorkOrder:'mobWO',                 //"M"
  OrderDate:'OrderDate',                   //"2022-10-11T00:00:00Z"
  PriceLevel:'PriceLvl',                   //"CLA"
  PrintedYetDaily:'PrintYet',              //"N"
  ProvinceStateCode:'State',               //"MO"
  SalesCategoryCode:'saleCat',             //"       350"
  SalesTaxApplicable:'SalesTax',           //"E"
  SalesTaxGroup:'SalesTaxGrp',             //"MOMONTX"
  ScheduleTime:'schTime',                  //"1031"
  ScheduledCompletionDate:'schCompDate',   //"2022-10-11T00:00:00Z"
  ScheduledCompletionTime:'schCompTime',   //"1032"
  ScheduledDate:'schDate',                 //"2022-10-11T00:00:00Z"
  ScheduledForTechnician:'sch4Tech',        //"20221011@1031"
  TakenBy:'TakenBy',                       //"  132"
  TechnicianID:'TecchID',                  //"132"
  TerritorySalespersonCode:'EstCode',      //"HSE"
  TimeArrived:'TimeArrived',               //"1031"
  TravelMUTable:'TravMUTab',               //"MASTER"
  UpdateToCarrier:'UpdCarrier',            //"N"
  WOStatusCode:'WOStatus',                 //"O"
  WasMobileBilled:'MobBilled',             //"N"
  WorkOrderCategory:'WOCat',               //"1"
  WorkOrderNumber:'WONum',                 //"00024530"
  WorkOrderTicketPrinted:'WOTick'          //"N"
}

export var custtabdom ={   //Customer Data from JONAS
  ARSubledgerCode:'ARCode',                //"AR"
  AddressLine1:'Addy1',                    //"*123 VOGEL"
  AmtTotalToDateSales:'TotalSales',        //250
  CreatedDate:'CreateDate',                //"2020-12-30T00:00:00Z"
  CreatedTime:'CreateTime',                //"1159"
  CustomerCode:'CustCode',                 //"*VOGMISC"
  CustomerName:'CustName',                 //"MISC VOGEL"
  CustomerQuote:'CustQuote',               //"A"
  DateLastTransaction:'LastTrans',         //"2022-11-04T00:00:00Z"
  FinanceChargeCode:'FinCode',             //"    0"
  FiscalYearBackTwoYears:'FisBackTwo',     //"2019"
  FiscalYearCurrent:'FisCurrent',          //"2021"
  FiscalYearPrevious:'FisPrev',            //"2020"
  PrintDelinquencyLetter:'PrnLetter',      //"Y"
  PrintStatement:'PrnState',               //"Y"
  ProvinceStateCode:'State',               //"MO"
  SalesPersonCode:'EstCode',               //"HSE"
  SalesTaxApplicable:'SalesTax',           //"E"
  SalesTaxGroup:'SalesTaxGrp',             //"MOMONTX"
  UserID:'UserID',                         //"VOGCH"
  YTDSalesCurrentYear:'SalesCurrYr',       //250
  YearOpened:'Opened'                      //"2020-12-30T00:00:00Z"
}

export var contdom = {
  ARSubledgerCode:'ARCode',                //"AR"
  AnnualContractValue:'AnnualVal',         //266.67
  ApplyTax1:'ApplyTax1',                   //"N"
  ApplyTax2:'ApplyTax2',                   //"N"
  BillingType:'BillType',                  //"P"
  ContractDate:'ContDate',                 //"2021-09-13T00:00:00Z"
  ContractDateFrom:'ContFrom',             //"2021-09-15T00:00:00Z"
  ContractDateTo:'ContTo',                 //"2022-09-14T00:00:00Z"
  ContractNumberOriginal:'ContNumOrig',    //"0000001933"
  ContractNumberRenewed:'ContNumRen',      //"1933-2"
  ContractStatus:'ContStatus',             //"I"
  ContractType:'ContType',                 //"C21MF"
  ContractValue:'ContVal',                 //288
  CreatedDate:'CreateDate',                //"2021-09-13T00:00:00Z"
  CreatedTime:'CreateTime',                //"0946"
  CustomerCode:'CustCode',                 //"VOJO05"
  CycleSetup:'CycleSet',                   //"N"
  LastBilledDate:'LstBill',                //"2022-08-15T00:00:00Z"
  LastInvoiceNumber:'LstInvNum',           //"   C014464"
  LastWorkOrderNumber:'LstWONum',          //"00017663"
  LastWorkOrderServiceDate:'LstWODate',    //"2022-05-09T00:00:00Z"
  LocationLine1:'Addy1',                   //"4511 MAGNOLIA"
  LocationLine3:'Addy3',                   //"ST. LOUIS, MO 63110"
  NumberOfBillings:'NumBills',             //"12"
  NumberOfContractVisits:'NumVisits',      //" 2"
  OriginalContractDate:'OrigContDate',     //"2016-09-15T00:00:00Z"
  PhoneNumber1:'Phone1',                   //"314-799-4760"
  ReasonForInactiveOrHold:'Reason4Hold',   //"Renewed Sep7/22"
  RecognizedRevenueVisitBilled:'RRVisitBill',//"N"
  SalesCategoryCode:'SalesCat',            //"       300"
  SendRenewalDate:'SendRenew',             //"2022-08-01T00:00:00Z"
  ServiceContractNumber:'ContNum',         //"0001933-R1"
  ThisIsAMasterContract:'MastCont',        //"N"
  UserID:'UserID',                         //"VOGCH"
  WorkOrderCategory:'WOCat'                //"6"
}

export var sitabdom = {    //Service Items data from JONAS
  ARSubledgerCode:'ARCode',                //"AR"
  CustomerCode:'CustCode',                 //"*VOGMISC"
  EquipmentModelNumber:'Model',            //"58sbo"
  LineNumber:'LnNum',                      //"00008"
  LineNumberUnique:'LnNumU',               //"00008"
  Manufacturer:'Manf',                     //"Carrier"
  Quantity:'Qty',                          //1
  SerialNumber:'Serial',                   //"1111111"
  Status:'Status',                         //"A"
  TagDescription:'TagDesc',                //"Furance"
  TagID:'TagID'                            //"1"
}

export var convert=(map,obj={})=>{
  let tobj={};
  for(let o in obj){
    if(map[o]){
      tobj[map[o]]=obj[o];
    }
  }
  return tobj;
}
