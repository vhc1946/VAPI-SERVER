export class EmailForm {
    constructor(name){
        this.name = name
    }

    GETcontent() {
      return `<body id = "email-body">
      <style>
        body, table, td, a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          -webkit-text-size-adjust: 100% !important;
          -ms-text-size-adjust: 100% !important;
          -webkit-font-smoothing: antialiased !important;
          font-family: Arial, Helvetica, sans-serif;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        table {
          
          mso-table-lspace: 0px !important;
          mso-table-rspace: 0px !important;
        }
        td {
          
          mso-line-height-rule: exactly;
          font-family: Arial, Helvetica, sans-serif;
        }
      </style>
      <table cellpadding="0" cellspacing="0">
        <tr><td><h3>Dear <span id="client-name" className = "client-name-title">${this.name}</span>,</h3>
        </td></tr>
        <tr><td><table cellpadding="0" cellspacing="0" width="100%">
        <tr><td>
          <p>Thank you for allowing our company a chance to service the AIR your Family experiences where you live, breathe, sleep and spend time together!</p>
          <p>Our technician prepared this invoice, summary of recommendations, and system diagnostic report for your records.</p>
          <p>Please feel free to reach out to us if you have any questions by calling 314-351-2533 opt. 2</p>
          <p>Thank you again for choosing our company.   We trust that we’ve delivered the best possible comfort for you and your home.  Please consider sharing your experience with us by leaving a <a href="http://search.google.com/local/writereview?placeid=ChIJNWbEZtzU3ocRUMVCWy7ldq4">review.</a></p>
          <a href="https://www.vogelheating.com/">Vogel Heating & Cooling</a>
        </td>
        </tr>
        </table></td></tr>
        <tr><td style="border-left:2px solid blue;background-color:blue;color:white;font-weight:bold;padding:5px;width:100%;">HAVE ANY QUESTIONS?</td></tr>
        <tr><td style="border-left:2px solid blue;padding:5px;">
          Please feel free to reach out using any of the following contact methods:
          <table cellpadding="2" cellspacing="0" style="text-align: center;">
              <tr><td style="width:300px;" width="300px"><b>Text Us</b> at <b>314-310-2110</b></td><td style="width:150px;" width="150px">Monday-Friday</td><td style="width:150px;" width="150px">8:00a - 4:30p</td></tr>
              <tr><td><b>Call Us</b> at <b>314-351-2533, Opt 2</b></td><td>Monday-Friday</td><td>8:00a - 4:30p</td></tr>
              <tr><td><b>Chat with Us</b> at <b><a href="http://vogelheating.com">vogelheating.com</a></b></td><td>Monday-Friday</td><td>8:00a - 4:30p</td></tr>         
            </table>
            <p style="text-align:center;font-style:italic;"><b>Jim Panick - Division Manager</b> &nbsp;&nbsp;&nbsp;&nbsp; office: 314-351-2533 &nbsp;&nbsp;&nbsp;&nbsp; email: <a href="mailto:jimp@vogelheating.com">jimp@vogelheating.com</a></p>
        </td></tr>
        <tr><td style="padding-top:10px;">
          Thank you again for your thoughtful consideration of our company. We look forward to delivering the best possible comfort for you and your home!
          <p>Sincerely,
          <p style="font-weight: bold;font-style: italic;">
            John Vogel
          </p>
        </td></tr>
      </table>
      </body>`
    }
}