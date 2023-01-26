import {ExcelDateToJSDate} from '../../tools/xltools.js';

var aserviceitem = (si)=>{
  console.log('SI',si);
    if(!si || si==undefined){
        si = {};
    }
    return {
        id: si.id || '', //LineNumberUnique
        tagid: si.tagid || '', //TageID
        descr:si.descr||'', //TageDescription
        qnty:si.qnty || '', //Quantity

        type:si.type ||'', //UnitType
        status: si.status || '',//Status
        area: si.area || '', //Area
        location: si.location || '', //Location
        manf: si.manf || '', //Manufacturer
        model: si.model || '', //EquipmentModelNumber
        serial: si.serial || '', //SerialNumber

        installby:si.installby||'', //Installer
        installdate: si.installdate || '', //InstallationDate

        warr1: si.warr1 || '', //WarrantyPeriod1
        expry1: si.expry1 || '', //ExpiryDate1
        warr2: si.warr2 || '', //WarrantyPeriod2
        expry2: si.expry2 || '', //ExpiryDate2
        warr3: si.warr3 || '', //WarrantyPeriod3
        expry3: si.expry3 || '', //ExpiryDate3

        ///////////////////////////////////////////
        filt1:  si.filt1 || '',
        filt1q: si.filt1q || '',
        filt2: si.filt2 || '',
        filt2q: si.filt2q || '',
        beltsize: si.beltsize || '',
        controls: si.controls || '',
        refri: si.refri || '',
        elec: si.elec || '',
    }
}

var vjserviceitemmap = (vjsi = null) => {
    if (!vjsi || vjsi==undefined){
        vjsi = {}
    }
    return {
        id: vjsi['id        '] || '',  //References Customer ID
        tagnum: vjsi['tagNum'] || '',
        type: vjsi['unitType '] || '',
        status: vjsi['status'] || '',
        area: vjsi['area      '] || '',
        location: vjsi['location '] || '',
        desc: vjsi['descr       '] || '',
        manf: vjsi['manufacturer        '] || '',
        model: vjsi['modelNum     '] || '',
        serial: vjsi['serialNum    '] || '',
        insdate: vjsi['installD'] ?ExcelDateToJSDate(vjsi['installD']) : '',
        warr1: vjsi['warr1   '] || '',
        warr2: vjsi['warr2   '] || '',
        warr3: vjsi['warr3   '] || '',
        filt1: vjsi['filt1                         '] || '',
        filt1q: vjsi[' filt1qnty'] || '',
        filt2: vjsi['filt2                         '] || '',
        filt2q: vjsi[' filt2qnty'] || '',
        beltsize: vjsi['beltsize                      '] || '',
        controls: vjsi['controls'] || '',
        refri: vjsi['refrigerant                   '] || '',
        elec: vjsi['volt-phase'] || '',
    }
}

export {
    aserviceitem,
    vjserviceitemmap
}
