let dom = {
    info:{
        customername: 'invoice-info-client',
        street: 'invoice-info-street',
        cityzip: 'invoice-info-city',
        jstreet: 'invoice-info-lstreet',
        jcity: 'invoice-info-lcity',
        invnum: 'invoice-info-invnum',
        invdate: 'invoice-info-invdate',
        terms: 'invoice-info-terms',
        custcode: 'invoice-info-custcode',
        reference: 'invoice-info-reference',
        id: 'invoice-info-wonum',
        wotype: 'invoice-info-wotype',
        location: 'invoice-info-location',
        strtdate: 'invoice-info-strtdate',
        compdate: 'invoice-info-compdate',
        total: 'invoice-info-total',
        descr: 'invoice-info-description'
    },
    repairs:{
        repairtable:'invoice-repair-table'
    }
}
let content = `
    <img id='header-logo'src="http://3.145.12.72//repo/assets/images/Header_clean.png"/>
    <div class="invoice-top">
        <div class="invoice-section-client">
            <div class="invoice-sectionhead">SOLD TO:</div>
            <div>
                <div class="${dom.info.customername}">Client Name</div>
                <div class="${dom.info.street}">1234 Street Dr</div>
                <div class="${dom.info.cityzip}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-location">
            <div class="invoice-sectionhead">JOB LOCATION:</div>
            <div>
                <div class="${dom.info.jstreet}">1234 Street Dr</div>
                <div class="${dom.info.jcity}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-info">
            <label class="invoice-sectionlabel">Invoice Number:</label><div class="${dom.info.invnum}">Test</div>
            <label class="invoice-sectionlabel">Invoice Date:</label><div class="${dom.info.invdate}">Test</div>
            <label class="invoice-sectionlabel">Terms:</label><div class="${dom.info.terms}">Test</div>
            <label class="invoice-sectionlabel">Customer Code:</label><div class="${dom.info.custcode}">Test</div>
            <label class="invoice-sectionlabel">Reference:</label><div class="${dom.info.reference}">Test</div>
            <label class="invoice-sectionlabel">Work Order #:</label><div class="${dom.info.id}">Test</div>
            <label class="invoice-sectionlabel">Work Order Type:</label><div class="${dom.info.wotype}">Test</div>
            <label class="invoice-sectionlabel">Job Location:</label><div class="${dom.info.location}">Test</div>
            <label class="invoice-sectionlabel">Starting Date:</label><div class="${dom.info.strtdate}">Test</div>
            <label class="invoice-sectionlabel">Completion Date:</label><div class="${dom.info.compdate}">Test</div>
        </div>
    </div>
    <div class="invoice-middle" id = "description-cont">
        <div class="invoice-desccont">
            <div class="${dom.info.descr}">This does not need to be here</div>
        </div>
    </div>
    <div class="invoice-body">
        <div class="invoice-descbox">
            <div class="wo-present-headers">
                <div>Services & Repairs</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Approval</div>
            </div>
            <div class = "${dom.repairs.repairtable}"></div>
        </div>
        <div class="invoice-totals">
            <div class = "signature-box" id = "sig-insert">
                
            </div>
            <div class = "invoice-totals-box">
                <div>
                    
                </div>
                <div>
                    <label class="invoice-sectionlabel">Total Invoice</label>
                    <div class="${dom.info.total}">420.00</div>
                </div>
            </div>
        </div>
        <div class="footer-header">Invoice Summary</div>
    </div>


    <div class="pagebreak"></div>
`

export var basicinvoice ={
    dom:dom,
    content:content
}