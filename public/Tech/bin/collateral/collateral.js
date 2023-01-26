import { CollateralForm } from "../forms/collateral-form.js";
import { SummaryCheckList } from "./checklists/summary-checklist.js";
import { basicinvoice } from "./invoices/basic-invoice.js";
import {DropNote} from '../repo/modules/vg-dropnote.js';
import {SENDrequestapi} from '../repo/apis/vapi/vapicore.js';


//setup emailing vars

var emailcontent = {
  wosum:'',
  checks:[],
  invoice:''
}

//generate presentation printout

var ticket = window.opener.data;
var summary = window.opener.summary;
var repairtable = window.opener.repairtable;
const contractopts = window.opener.contractopt;
repairtable.id = "wo-present-system-summary"

console.log("Ticket from collateral::::", ticket)

var summary = window.opener.summary;
ticket.wo.location = ticket.wo.street;
ticket.wo.jstreet = ticket.wo.street;
ticket.wo.jcity = ticket.wo.cityzip;
ticket.wo.invdate = new Date().toLocaleDateString();
var price = 0;
if (ticket.wo.pricelevel == "STA") {
    price = window.opener.regprice
} else {
    price = window.opener.memberprice
}

//ACTION events ////////////
/**
 * Event listener to download PDF of summary
 */
document.getElementById('print-collateral').addEventListener('dblclick',(ele)=>{
  window.print();
  ticket.track.downloaded = true;
  /*
  var pdf = new jsPDF('p', 'pt', 'letter');
  pdf.canvas.height = 72 * 11;
  pdf.canvas.width = 72 * 8.5;

  pdf.fromHTML(document.body);

  pdf.save('test.pdf');
  */
 console.log(ticket)
});

/**
 * Event listener to send email of PDF
 */
document.getElementById('email-collateral').addEventListener('dblclick',(ele)=>{
  alert('will email');
  ticket.track.emailed = true;
  console.log(ticket);
  //get and validate email from screen
  //get array of all conent on collateral page
  console.log(emailcontent)
  SENDrequestapi({to:'christianv@vogelheating.com',subject:'Check This Out',attach:emailcontent},'MAIL').then(
    answer=>{console.log(answer);}
  );
});

/**
 * Event listener to open checklist popup
 */
document.getElementById('complete-ticket').addEventListener('dblclick',(ele)=>{
    document.getElementById('tickcompcont').style.display = "grid"
    //Set checkboxes based on track
    if (ticket.track.emailed == true) {document.getElementById('email-check').checked = true}
    if (ticket.track.downloaded == true) {document.getElementById('download-check').checked = true}
    if (ticket.track.sold == true) {document.getElementById('sold-check').checked = true}
});

/**
 * Event listeners for changing value of complete checklist checks
 */
document.getElementById('email-check').addEventListener('click', (eve)=>{
    ticket.track.email = document.getElementById('email-check').checked
})
document.getElementById('download-check').addEventListener('click', (eve)=>{
    ticket.track.download = document.getElementById('download-check').checked
})
document.getElementById('sold-check').addEventListener('click', (eve)=>{
    ticket.track.sold = document.getElementById('sold-check').checked
})

/**
 * Event listener to close checklist container for going back to ticket
 */
document.getElementsByClassName('container-close')[0].addEventListener('click', (eve)=>{
    document.getElementById('tickcompcont').style.display = "none"
})

/**
 * Event listener for the final close ticket button
 */
document.getElementById('final-complete-ticket').addEventListener('dblclick', (eve)=>{
    let AllChecked = true;
    inputs = document.getElementById('tickcompcont').getElementsByTagName('INPUT');
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "checkbox") {
            if (inputs[i].checked == false) {
                AllChecked = false;
                let text = inputs[i].parentElement.firstElementChild.innerText
                DropNote('tr','Must verify '+text+' to complete','yellow');
                break;
            }
        }
    }
    if (AllChecked) {
        //Save and set mobile to true
        window.opener.ticket.mobile = false;
        window.opener.SAVEticket();
        window.opener.close();
        window.close();
        //window.opener.opener.removerow(ticket.wo.id) //Does not work, currently removes all items from row
        alert("Ticket saved and closed!")
    }
})

/**
 * Event listener to open payment URL
 */
document.getElementById('payment-card').addEventListener('click',(ele)=>{
    window.open("https://www.swipesimple.com/links/lnk_0c729904");
});
//FILL EMAIL INPUT
if (ticket.wo.contactemail != "" || ticket.wo.contactemail != undefined) {
    document.getElementById('email-input').value = ticket.wo.contactemail;
}

////////////////////////////

/**
 * CREATE REWARD SUMMARY FORM
 */

var summaryform = document.body.appendChild(window.opener.presentation);

summaryform.appendChild(document.createElement('div'));
summaryform.lastChild.className='pagebreak';

emailcontent.wosum = summaryform.outerHTML;

//var pagebreak = document.createElement('div');
//document.body.appendChild(pagebreak);
//pagebreak.className = "pagebreak"

if (window.opener.signature) {
    document.getElementsByClassName('wo-present-signature')[0].prepend(window.opener.signature.cloneNode(true))
}
//Convert inputs to div
let SelectDiv = document.getElementsByClassName('select')[0]
SelectDiv.innerHTML = "";
var inputs = document.getElementsByClassName('present-contract-opts')[0].getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i]
    var parentNode = input.parentNode;
    let newElem = document.createElement('div')
    if (input.type == "checkbox") {
        if (input.checked) {
            newElem.innerText = "YES"
            SelectDiv.innerText = ticket.contract.pricelevel
        } else {
            newElem.innerText = "NO"
            SelectDiv.innerText = "NO PLAN SELECTED"
        }
    } else {
        newElem.innerText = input.value;
    }
    parentNode.insertBefore(newElem, parentNode.childNodes[2])
}
SelectDiv.className = "present-contract-name"

/**
 * CREATE CHECKLIST FORM
 */
//Loop through each summary
for (let i = 0; i < summary.length; i++){
    var checksum = new CollateralForm(document.createElement('div'),new SummaryCheckList(summary[i].summary.content, summary[i].name));
    document.body.appendChild(checksum.cont);
    document.getElementsByClassName(checksum.dom.info.street)[i].innerText = ticket.wo.street;
    document.getElementsByClassName(checksum.dom.info.cityzip)[i].innerText = ticket.wo.cityzip;
    emailcontent.checks.push(checksum.cont.outerHTML);
}


/**
 * CREATE INVOICE FORM
 */
var invoice = new CollateralForm(document.createElement('div'),basicinvoice);

document.body.appendChild(invoice.cont);
for(let i in invoice.dom.info){
    if(ticket.wo[i]){
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = ticket.wo[i];
    }else{
        if (invoice.dom.info[i] == "invoice-info-total") {
            document.getElementsByClassName(invoice.dom.info[i])[0].innerText = price;
        } else {
            document.getElementsByClassName(invoice.dom.info[i])[0].innerText = '';
        }
    }
}

//TODO: Create a table using repairs
let sitems = window.opener.sitems;
let RepairBox = document.getElementsByClassName(invoice.dom.repairs.repairtable)[0];
for (let i = 0; i < sitems.length; i++) {
    //Make the system label
    let SystemDiv = document.createElement('div');
    let SystemLabel = document.createElement('div');
    SystemLabel.innerText = sitems[i].tagid;
    SystemLabel.className = "System-Label"
    SystemDiv.appendChild(SystemLabel);

    //Create row for each repair item
    for (let j = 0; j < ticket.repairs[i].length; j++) {
        let Repair = ticket.repairs[i][j];
        if (Repair.appr == true) {
            //Create row
            let Row = document.createElement('div')
            Row.className = "invoice-repair-row";

            //Create description
            let Description = document.createElement('div');
            Description.innerText = Repair.descr;
            Row.appendChild(Description);

            //Create QTY
            let Quantity = document.createElement('div')
            Quantity.innerText = Repair.qty;
            Row.appendChild(Quantity);

            let Price = document.createElement('div')
            Price.innerText = Repair.price;
            Price.id = "PriceLabel"
            Row.appendChild(Price);

            let Approval = document.createElement('div')
            Approval.innerText = 'YES';
            Row.appendChild(Approval);

            SystemDiv.appendChild(Row);
        }
    }


    //Add the system to the Repair Box
    RepairBox.appendChild(SystemDiv)
}

//TODO: Add a spot in Invoice dom for signature to go
if (window.opener.signature) {
    document.getElementById('sig-insert').appendChild(window.opener.signature)
}
emailcontent.invoice = invoice.cont.outerHTML;
//Change default name of printed document
document.title = String(ticket.wo.id)+'-'+ticket.wo.custcode;
