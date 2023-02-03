const dom = {
        cont: 'system-info',
        fields: {
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
            ou_acce_econ: 'econ',
            ou_info_temp: 'temp'
        },
        valids: {}
    }
const content = `
      <div class="checklist-cont" class="system-info">
          <div class="outer-section-cont">
              <div class="checklist-section" id = "in-sys">
                  <div class="main-section-header">Indoor</div>
                  <div class="section-cont">
                      <div class="checklist-card" id="in-sys-info">
                          <div class="section-header">Info</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>System Designation</div><input class="${dom.fields.in_info_indes}">
                              </div>
                              <div class="checklist-item">
                                  <div>Heating System Age</div><input class="${dom.fields.in_info_heatage}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated Capacity</div><input class="${dom.fields.in_info_heatratedcap}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Actual Capacity</div><input class="${dom.fields.in_info_heatactualcap}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Lost Efficiency</div><input class="${dom.fields.in_info_heatlosteffic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>System Condition</div>
                                  <select class="${dom.fields.in_info_incondition}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Average">Average</option>
                                    <option value="Consider Replacement">Consider Replacement</option>
                                    <option value="Replacement Recommended">Replacement Recommended</option>
                                </select>
                              </div>
                          </div>
                      </div>
                      <div class="checklist-card" id="in-sys-airflow">
                          <div class="section-header">Airflow</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Supply Air Static</div><input class="${dom.fields.ou_airf_supplystatic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Return Air Static</div><input class="${dom.fields.in_airf_returnstatic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated CFM</div>
                                  <select class="${dom.fields.in_airf_ratedcfm}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="525 - 600 (1.5 Ton)">525 - 600 (1.5 Ton)</option>
                                    <option value="700 - 800 (2 Ton)">700 - 800 (2 Ton)</option>
                                    <option value="875 - 1000 (2.5 Ton)">875 - 1000 (2.5 Ton)</option>
                                    <option value="1050 - 1200 (3 Ton)">1050 - 1200 (3 Ton)</option>
                                    <option value="1225 - 1400 (3.5 Ton)">1225 - 1400 (3.5 Ton)</option>
                                    <option value="1400 - 1600 ( 4 Ton)">1400 - 1600 ( 4 Ton)</option>
                                    <option value="1750 - 2000 (5 Ton)">1750 - 2000 (5 Ton)</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Actual CFM</div><input class="${dom.fields.ou_airf_actualcfm}">
                              </div>
                              <div class="checklist-item">
                                  <div>Building Pressure</div><input class="${dom.fields.in_airf_buildpress}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Particle Count</div><input class="${dom.fields.in_airf_partcount}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Filters Condition</div>
                                  <select class="${dom.fields.in_airf_filtercond}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Clean">Clean</option>
                                    <option value="Replaced">Replaced</option>
                                    <option value="Needs Replacement">Needs Replacement</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Evaporator Coil Condition</div>
                                  <select class="${dom.fields.in_airf_evapcond}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Clean">Clean</option>
                                    <option value="Needs Cleaning">Needs Cleaning</option>
                                    <option value="Leak Detected">Leak Detected</option>
                                    <option value="Damaged">Dammaged</option>
                                  </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Belt Tight</div>
                                  <select class="${dom.fields.in_airf_belttight}">
                                    <option value="N/A" selected>N/A</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Needs Repair or Replacement">Needs Repair or Replacement</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="checklist-card" id="in-sys-cooling">
                          <div class="section-header">Cooling</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Drain Clear & Secure</div>
                                  <select class="${dom.fields.in_cool_drainclear}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Clean">Clean</option>
                                    <option value="Needs Cleaning">Needs Cleaning</option>
                                    <option value="Leak Detected">Leak Detected</option>
                                    <option value="Damaged">Dammaged</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="checklist-card" id="in-sys-heating">
                          <div class="section-header">Heating</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Drain Clear & Secure</div>
                                  <select class="${dom.fields.in_heat_drainclear}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Clean">Clean</option>
                                    <option value="Needs Cleaning">Needs Cleaning</option>
                                    <option value="Leak Detected">Leak Detected</option>
                                    <option value="Damaged">Dammaged</option>
                                  </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Pump Lockout Temperature</div><input class="${dom.fields.in_heat_hplockout}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Thermostat Programmed</div>
                                  <select class="${dom.fields.in_heat_statprog}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value='Yes'>Yes</option>
                                    <option value='Recommended'>Recommended</option>
                                    <option value='No'>No</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="checklist-card" id="in-sys-access">
                          <div class="section-header">Accessories</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Humidifier Operations</div>
                                  <select class="${dom.fields.in_acce_humdop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Whole Home Air Cleaner</div>
                                  <select class="${dom.fields.in_acce_eacop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Energy Recovery Ventilator</div>
                                  <select class="${dom.fields.in_acce_ervop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Anti Microbial Lamp System</div>
                                  <select class="${dom.fields.in_acce_uvop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>CO Sensor </div>
                                  <select class="${dom.fields.in_acce_coop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="checklist-section" id = "ou-sys">
                  <div class="main-section-header">Outdoor</div>
                  <div class="section-cont">
                      <div class="checklist-card" id="ou-sys-info">
                          <div class="section-header">Info</div>
                          <div class="section-cont">
                            <div class="checklist-item">
                                  <div>Temperature</div><input class="${dom.fields.ou_info_temp}" type="number" placeholder="Enter Current Temperature (F)">
                              </div>
                              <div class="checklist-item">
                                  <div>System Designation</div><input class="${dom.fields.ou_info_outdes}">
                              </div>
                              <div class="checklist-item">
                                  <div>Cooling System Age</div><input class="${dom.fields.ou_info_coolage}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated Capacity</div><input class="${dom.fields.ou_info_coolratedcap}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Actual Capacity</div><input class="${dom.fields.ou_info_coolactualcap}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Lost Efficiency</div><input class="${dom.fields.ou_info_coollosteffic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>System Condition</div>
                                  <select class="${dom.fields.ou_info_outcondition}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Average">Average</option>
                                    <option value="Consider Replacement">Consider Replacement</option>
                                    <option value="Replacement Recommended">Replacement Recommended</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="checklist-card" id="ou-sys-airflow" style="display:none">
                          <div class="section-header">Airflow</div>
                          <div class="section-cont">
                              
                          </div>
                      </div>
                      <div class="checklist-card" id="ou-sys-access">
                          <div class="section-header">Accessories</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Economizer</div>
                                  <select class="${dom.fields.ou_acce_econ}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    <datalist id='cond-condition'>
        <option value='Clean'>
        <option value='Needs Cleaning'>
        <option value='Leak Detected'>
        <option value='Damaged'>
    </datalist>
    <datalist id='wear-tear'>
        <option value='Operational'>
        <option value='Worn & Doubtful'>
        <option value='Failed'>
        <option value='Failed - Furnace Tagged'>
        <option value='Recommended'>
    </datalist>
    <datalist id='needs-repairs'>
        <option value='Yes'>
        <option value='Repairs Needed'>
    </datalist>
    <datalist id='sys-condition'>
        <option value='Excellent'>
        <option value='Good'>
        <option value='Average'>
        <option value='Consider Replacement'>
        <option value='Replacement Recommended'>
    </datalist>
    <datalist id='belt-condition'>
        <option value='N/A'>
        <option value='Yes'>
        <option value='Needs Repair or Replacement'>
    </datalist>
    <datalist id='filter-condition'>
        <option value='Clean'>
        <option value='Replaced'>
        <option value='Needs Replacement'>
    </datalist>
    <datalist id='stat-condition'>
        <option value='Yes'>
        <option value='Recommended'>
        <option value='No'>
    </datalist>
    <datalist id='CFM-rating'>
        <option value='525 - 600 (1.5 Ton)'>
        <option value='700 - 800 (2 Ton)'>
        <option value='875 - 1000 (2.5 Ton)'>
        <option value='1050 - 1200 (3 Ton)'>
        <option value='1225 - 1400 (3.5 Ton)'>
        <option value='1400 - 1600 ( 4 Ton)'>
        <option value='1750 - 2000 (5 Ton)'>
    </datalist>
`

  export var systemchecks ={
    dom:dom,
    content:content
}