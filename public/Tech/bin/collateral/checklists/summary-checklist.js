let dom={
    info: {
        street: 'street',
        cityzip: 'cityzip',
        wo_desc: 'wo_desc',
        in_cool_densityalt: 'densityalt',
        in_cool_wbentering: 'wbentering',
        in_cool_wbleaving: 'wbleaving',
        in_cool_dbentering: 'dbentering',
        in_cool_dbleaving: 'dbleaving',
        in_cool_tempdrop: 'tempdrop',
        ou_cool_sucpress: 'sucpress',
        ou_cool_headpress: 'headpress',
        ou_cool_liqpress: 'liqpress',
        ou_cool_dboutdoor: 'dboutdoor',
        ou_cool_targetsh: 'targetsh',
        ou_cool_actualsh: 'actualsh',
        ou_cool_targetsc: 'targetsc',
        ou_cool_actualsc: 'actualsc',
        ou_cool_ratedamps: 'ratedamps',
        ou_cool_actualamps: 'actualamps',
        ou_cool_condfan: 'condfan',
        ou_cool_condcoil: 'condcoil',
        ou_cool_elecout: 'elecout',
        in_heat_hriserated: 'hriserated',
        in_heat_hriseactual: 'hriseactual',
        in_heat_gpin: 'gpin',
        in_heat_gpouthigh: 'gpouthigh',
        in_heat_gpoutlow: 'gpoutlow',
        in_heat_flmsensor: 'flmsensor',
        in_heat_ignitionop: 'ignitionop',
        in_heat_combustop: 'combustop',
        in_heat_fluesafety: 'fluesafety',
        in_heat_heatex: 'heatex',
        in_heat_inducerops: 'inducerops',
        in_heat_testO2: 'testO2',
        in_heat_testCO: 'testCO',
        in_heat_testeffic: 'testeffic',
        in_heat_testCO2: 'testCO2',
        in_heat_stacktemp: 'stacktemp',
        in_heat_elecin: 'elecin',
        ai_heat_blowerrated: 'blowerrated',
        ai_heat_bloweractual: 'bloweractual',
        in_info_indes: 'indes',
        in_info_heatage: 'heatage',
        in_info_heatratedcap: 'heatratedcap',
        in_info_heatactualcap: 'heatactualcap',
        in_info_heatlosteffic: 'heatlosteffic',
        in_info_incondition: 'incondition',
        in_airf_returnstatic: 'returnstatic',
        in_airf_ratedcfm: 'ratedcfm',
        in_airf_buildpress: 'buildpress',
        in_airf_partcount: 'partcount',
        in_airf_filtercond: 'filtercond',
        in_airf_evapcond: 'evapcond',
        in_airf_belttight: 'belttight',
        in_cool_drainclear: 'cooldrainclear',
        in_heat_drainclear: 'heatdrainclear',
        in_heat_hplockout: 'hplockout',
        in_heat_statprog: 'statprog',
        in_acce_humdop: 'humdop',
        in_acce_eacop: 'eacop',
        in_acce_ervop: 'ervop',
        in_acce_uvop: 'uvop',
        in_acce_coop: 'coop',
        ou_info_outdes: 'outdes',
        ou_info_coolage: 'coolage',
        ou_info_coolratedcap: 'coolratedcap',
        ou_info_coolactualcap: 'coolactualcap',
        ou_info_coollosteffic: 'coollosteffic',
        ou_info_outcondition: 'outcondition',
        ou_airf_supplystatic: 'supplystatic',
        ou_airf_actualcfm: 'actualcfm',
        ou_acce_econ: 'econ'
    },
    valids: {}
}

let temptext = 'CLASSIC AC MAINTENANCE 2 SYSTEM SPRING ANNUAL RENEWALundefinedTUNED UP ACS PER CLASSIC REWARDS. CLEAN AND CHECKED COILSDRAINS CONTACTORS CAPACITORS MOTORS WHEELS WIRINGDISCONNECTS CHARGE TDREPLACED FILTERS.BLEW OUT DRAINLINESSHUT HUMIDIFIERS OFF FOR WINTERADDED 4#S R.22 SMALLER CARRIER FROM 2005.  NO LEAK SEARCHPERFORMEDCAPACITOR 30.5.  ACTUAL 30.5VIP CUSTOMERCLASSIC. 540.00R22. 285.00FILTER 16X25X4 27.0020X25X4. 29.00TOTAL. 881.00.    *****PLEASE BILL THRU OFFICE. ******GATE CODE. #5566'

let tempdata = {
        street: 'street',
        cityzip: 'cityzip',
        wo_desc: 'wo_desc',
        densityalt: 'densityalt',
        wbentering: 'wbentering',
        wbleaving: 'wbleaving',
        dbentering: 'dbentering',
        dbleaving: 'dbleaving',
        tempdrop: 'tempdrop',
        sucpress: 'sucpress',
        headpress: 'headpress',
        liqpress: 'liqpress',
        dboutdoor: 'dboutdoor',
        targetsh: 'targetsh',
        actualsh: 'actualsh',
        targetsc: 'targetsc',
        actualsc: 'actualsc',
        ratedamps: 'ratedamps',
        actualamps: 'actualamps',
        condfan: 'condfan',
        condcoil: 'condcoil',
        elecout: 'elecout',
        hriserated: 'hriserated',
        hriseactual: 'hriseactual',
        gpin: 'gpin',
        gpouthigh: 'gpouthigh',
        gpoutlow: 'gpoutlow',
        flmsensor: 'flmsensor',
        ignitionop: 'ignitionop',
        combustop: 'combustop',
        fluesafety: 'fluesafety',
        heatex: 'heatex',
        inducerops: 'inducerops',
        testO2: 'testO2',
        testCO: 'testCO',
        testeffic: 'testeffic',
        testCO2: 'testCO2',
        stacktemp: 'stacktemp',
        elecin: 'elecin',
        blowerrated: 'blowerrated',
        bloweractual: 'bloweractual',
        indes: 'indes',
        heatage: 'heatage',
        heatratedcap: 'heatratedcap',
        heatactualcap: 'heatactualcap',
        heatlosteffic: 'heatlosteffic',
        incondition: 'incondition',
        returnstatic: 'returnstatic',
        ratedcfm: 'ratedcfm',
        buildpress: 'buildpress',
        partcount: 'partcount',
        filtercond: 'filtercond',
        evapcond: 'evapcond',
        belttight: 'belttight',
        cooldrainclear: 'cooldrainclear',
        heatdrainclear: 'heatdrainclear',
        hplockout: 'hplockout',
        statprog: 'statprog',
        humdop: 'humdop',
        eacop: 'eacop',
        ervop: 'ervop',
        uvop: 'uvop',
        coop: 'coop',
        outdes: 'outdes',
        coolage: 'coolage',
        coolratedcap: 'coolratedcap',
        coolactualcap: 'coolactualcap',
        coollosteffic: 'coollosteffic',
        outcondition: 'outcondition',
        supplystatic: 'supplystatic',
        actualcfm: 'actualcfm',
        econ: 'econ'
}



export class SummaryCheckList{
    constructor(data = null, name="Your System"){
        if (data == null) {
            data = tempdata
        }
        this.innertext = data,
        this.name = name
        this.dom = dom,
        this.content =`
        <div class="summary-header">
            <div id="title-header">${this.name} Summary</div>
            <div><span class="${dom.info.street}">1234 Street Dr</span> , <span class=${dom.info.cityzip}>Fenton, MO 63026</span></div>
        </div>  
        <div class="summary-body">
            <div class="summary-section-info">
                <div class="section-header-sys">System Info</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>System Designation:</div><div class="${dom.info.in_info_indes}">${this.innertext.indes}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Heating System Age:</div><div class="${dom.info.in_info_heatage}">${this.innertext.heatage}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Rated Capacity:</div><div class="${dom.info.in_info_heatratedcap}">${this.innertext.heatratedcap}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Capacity:</div><div class="${dom.info.in_info_heatactualcap}">${this.innertext.heatactualcap}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Lost Efficiency:</div><div class="${dom.info.in_info_heatlosteffic}">${this.innertext.heatlosteffic}</div>
                    </div>
                    <div class="checklist-item">
                        <div>System Condition:</div><div class="${dom.info.in_info_incondition}">${this.innertext.incondition}</div>
                    </div>
                </div>
                <div class="part-header">Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>System Designation:</div><div class="${dom.info.ou_info_outdes}">${this.innertext.outdes}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Cooling System Age:</div><div class="${dom.info.ou_info_coolage}">${this.innertext.coolage}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Rated Capacity:</div><div class="${dom.info.ou_info_coolratedcap}">${this.innertext.coolratedcap}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Capacity:</div><div class="${dom.info.ou_info_coolactualcap}">${this.innertext.coolactualcap}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Lost Efficiency:</div><div class="${dom.info.ou_info_coollosteffic}">${this.innertext.coollosteffic}</div>
                    </div>
                    <div class="checklist-item">
                        <div>System Condition:</div><div class="${dom.info.ou_info_outcondition}">${this.innertext.outcondition}</div>
                    </div>
                </div>
            </div>
            <div class="summary-section-airflow">
                <div class="section-header-air">Airflow</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Supply Air Static:</div><div class="${dom.info.ou_airf_supplystatic}">${this.innertext.supplystatic}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Return Air Static:</div><div class="${dom.info.in_airf_returnstatic}">${this.innertext.returnstatic}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Rated CFM:</div><div class="${dom.info.in_airf_ratedcfm}">${this.innertext.ratedcfm}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual CFM:</div><div class="${dom.info.ou_airf_actualcfm}">${this.innertext.actualcfm}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Blower Amp Rated:</div><div class="${dom.info.ai_heat_blowerrated}">${this.innertext.blowerrated}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Blower Amp Actual:</div><div class="${dom.info.ai_heat_bloweractual}">${this.innertext.bloweractual}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Building Pressure:</div><div class="${dom.info.in_airf_buildpress}">${this.innertext.buildpress}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Particle Count:</div><div class="${dom.info.in_airf_partcount}">${this.innertext.partcount}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Filters Condition:</div><div class="${dom.info.in_airf_filtercond}">${this.innertext.filtercond}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Evaporator Coil Condition:</div><div class="${dom.info.in_airf_evapcond}">${this.innertext.evapcond}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Belt Tight:</div><div class="${dom.info.in_airf_belttight}">${this.innertext.belttight}</div>
                    </div>
                </div>
            </div>
            <div class="summary-section-cooling">
                <div class="section-header-cool">Cooling</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Wet Bulb - Entering:</div><div class="${dom.info.in_cool_wbentering}">${this.innertext.wbentering}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Wet Bulb - Leaving:</div><div class="${dom.info.in_cool_wbleaving}">${this.innertext.wbleaving}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Dry Bulb - Entering:</div><div class="${dom.info.in_cool_dbentering}">${this.innertext.dbentering}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Dry Bulb - Leaving:</div><div class="${dom.info.in_cool_dbleaving}">${this.innertext.dbleaving}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Temperature Drop:</div><div class="${dom.info.in_cool_tempdrop}">${this.innertext.tempdrop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Drain Clear & Secure:</div><div class="${dom.info.in_cool_drainclear}">${this.innertext.cooldrainclear}</div>
                    </div>
                </div>
                <div class="part-header">Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Density Altitude:</div><div class="${dom.info.in_cool_densityalt}">${this.innertext.densityalt}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Suction Pressure:</div><div class="${dom.info.ou_cool_sucpress}">${this.innertext.sucpress}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Head Pressure:</div><div class="${dom.info.ou_cool_headpress}">${this.innertext.headpress}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Liquid Pressure:</div><div class="${dom.info.ou_cool_liqpress}">${this.innertext.liqpress}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Dry Bulb - Outdoor:</div><div class="${dom.info.ou_cool_dboutdoor}">${this.innertext.dboutdoor}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Target Superheat:</div><div class="${dom.info.ou_cool_targetsh}">${this.innertext.targetsh}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Superheat:</div><div class="${dom.info.ou_cool_actualsh}">${this.innertext.actualsh}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Target Subcooling:</div><div class="${dom.info.ou_cool_targetsc}">${this.innertext.targetsc}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Subcooling:</div><div class="${dom.info.ou_cool_actualsc}">${this.innertext.actualsc}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Compressor Amps Rated:</div><div class="${dom.info.ou_cool_ratedamps}">${this.innertext.ratedamps}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Compressor Amps Actual:</div><div class="${dom.info.ou_cool_actualamps}">${this.innertext.actualamps}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Condenser Fan Operation:</div><div class="${dom.info.ou_cool_condfan}">${this.innertext.condfan}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Condenser Coil Condition:</div><div class="${dom.info.ou_cool_condcoil}">${this.innertext.condcoil}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Electrical Connections Secured:</div><div class="${dom.info.ou_cool_elecout}">${this.innertext.elecout}</div>
                    </div>
                </div>
            </div>
            <div class="summary-section-heating">
                <div class="section-header-heat">Heating</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Heat Rise - Rated:</div><div class="${dom.info.in_heat_hriserated}">${this.innertext.hriserated}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Rise - Actual:</div><div class="${dom.info.in_heat_hriseactual}">${this.innertext.hriseactual}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Inlet:</div><div class="${dom.info.in_heat_gpin}">${this.innertext.gpin}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Outlet High Stage:</div><div class="${dom.info.in_heat_gpouthigh}">${this.innertext.gpouthigh}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Outlet Low Stage:</div><div class="${dom.info.in_heat_gpoutlow}">${this.innertext.gpoutlow}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Flame Sensor Current:</div><div class="${dom.info.in_heat_flmsensor}">${this.innertext.flmsensor}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Ignition Operation:</div><div class="${dom.info.in_heat_ignitionop}">${this.innertext.ignitionop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Operation:</div><div class="${dom.info.in_heat_combustop}">${this.innertext.combustop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Flue Safety:</div><div class="${dom.info.in_heat_fluesafety}">${this.innertext.fluesafety}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Exchanger:</div><div class="${dom.info.in_heat_heatex}">${this.innertext.heatex}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Inducer Motor Operations:</div><div class="${dom.info.in_heat_inducerops}">${this.innertext.inducerops}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test O2:</div><div class="${dom.info.in_heat_testO2}">${this.innertext.testO2}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test CO:</div><div class="${dom.info.in_heat_testCO}">${this.innertext.testCO}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test Efficiency:</div><div class="${dom.info.in_heat_testeffic}">${this.innertext.testeffic}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test CO2:</div><div class="${dom.info.in_heat_testCO2}">${this.innertext.testCO2}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test Stack Temp:</div><div class="${dom.info.in_heat_stacktemp}">${this.innertext.stacktemp}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Electrical Connections Secured:</div><div class="${dom.info.in_heat_elecin}">${this.innertext.elecin}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Drain Clear & Secure:</div><div class="${dom.info.in_heat_drainclear}">${this.innertext.heatdrainclear}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Pump Lockout Temperature:</div><div class="${dom.info.in_heat_hplockout}">${this.innertext.hplockout}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Thermostat Programmed:</div><div class="${dom.info.in_heat_statprog}">${this.innertext.statprog}</div>
                    </div>
                </div>
            </div>
            <div class="summary-section-access">
                <div class="section-header-access">Accessories</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Humidifier Operations:</div><div class="${dom.info.in_acce_humdop}">${this.innertext.humdop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Whole Home Air Cleaner:</div><div class="${dom.info.in_acce_eacop}">${this.innertext.eacop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Energy Recovery Ventilator:</div><div class="${dom.info.in_acce_ervop}">${this.innertext.ervop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Anti Microbial Lamp System:</div><div class="${dom.info.in_acce_uvop}">${this.innertext.uvop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>CO Sensor:</div><div class="${dom.info.in_acce_coop}">${this.innertext.coop}</div>
                    </div>
                    <div class="checklist-item">
                        <div>Economizer:</div><div class="${dom.info.ou_acce_econ}">${this.innertext.econ}</div>
                    </div>
                </div>
            </div>
            <div class="summary-section-descr">
                <div class="section-header-descr">Work Performed</div>
                <div class="${dom.info.wo_desc}">${temptext}</div>
            </div>
        </div>
        
        
        <img id='header-logo'src="../bin/repo/assets/images/Header_clean.png"/>

        <div class="pagebreak"> </div>
    `
    }


}
export var summarychecks ={
    dom:dom,
    content:tempdata
}