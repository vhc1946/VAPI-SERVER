const dom = {
    cont: 'heating-rewards',
    fields: {
        in_heat_hriserated: 'hriserated',
        in_heat_hriseactual: 'hriseactual',
        in_heat_gpin: 'gpin',
        in_heat_gpouthigh: 'gpouthigh',
        in_heat_gpoutlow: 'gpoutlow',
        in_heat_flmsensor: 'flmsensor',
        in_heat_blowerrated: 'blowerrated',
        in_heat_bloweractual: 'bloweractual',
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
        ai_heat_bloweractual: 'bloweractual'
    },
    valids: {}
}

const content = `
      <div class="checklist-cont" class="heating-rewards">
          <div class="outer-section-cont">
              <div class="checklist-section" id = "in-heat">
                  <div class="main-section-header">Indoor</div>
                  <div class="section-cont">
                      <div class="checklist-card" id="in-heat-heating">
                          <div class="section-header">Heating</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Heat Rise - Rated</div><input class="${dom.fields.in_heat_hriserated}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Rise - Actual</div><input class="${dom.fields.in_heat_hriseactual}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Inlet</div><input class="${dom.fields.in_heat_gpin}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Outlet High Stage</div><input class="${dom.fields.in_heat_gpouthigh}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Outlet Low Stage</div><input class="${dom.fields.in_heat_gpoutlow}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Flame Sensor Current</div><input class="${dom.fields.in_heat_flmsensor}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Blower Amp Rated</div><input class="${dom.fields.in_heat_blowerrated}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Blower Amp Actual</div><input class="${dom.fields.in_heat_bloweractual}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Ignition Operation</div>
                                  <select class="${dom.fields.in_heat_ignitionop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Operation</div>
                                  <select class="${dom.fields.in_heat_combustop}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Flue Safety</div>
                                  <select class="${dom.fields.in_heat_fluesafety}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Exchanger</div>
                                  <select class="${dom.fields.in_heat_heatex}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Inducer Motor Operations</div>
                                  <select class="${dom.fields.in_heat_inducerops}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                  </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test O2</div><input class="${dom.fields.in_heat_testO2}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test CO</div><input class="${dom.fields.in_heat_testCO}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test Efficiency</div><input class="${dom.fields.in_heat_testeffic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test CO2</div><input class="${dom.fields.in_heat_testCO2}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test Stack Temp</div><input class="${dom.fields.in_heat_stacktemp}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Electrical Connections Secured</div>
                                  <select class="${dom.fields.in_heat_elecin}">
                                    <option value="" disabled selected>Choose One</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Repairs Needed">Repairs Needed</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="checklist-card" id="in-heat-airflow">
                      <div class="section-header">Airflow</div>
                      <div class="section-cont">
                          <div class="checklist-item">
                              <div>Blower Amp Rated</div><input class="${dom.fields.ai_heat_blowerrated}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Blower Amp Actual</div><input class="${dom.fields.ai_heat_bloweractual}" type="number">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    <datalist id='cond-condition'>
        <option value="" disabled selected>Choose One</option>
        <option value='Clean'>
        <option value='Needs Cleaning'>
        <option value='Leak Detected'>
        <option value='Damaged'>
    </datalist>
    <datalist id='wear-tear'>
        <option value="" disabled selected>Choose One</option>
        <option value='Operational'>
        <option value='Worn & Doubtful'>
        <option value='Failed'>
        <option value='Failed - Furnace Tagged'>
        <option value='Recommended'>
    </datalist>
    <datalist id='needs-repairs'>
        <option value="" disabled selected>Choose One</option>
        <option value='Yes'>
        <option value='Repairs Needed'>
    </datalist>
  `
export var heatingchecks ={
    dom:dom,
    content:content
}