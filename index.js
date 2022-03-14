//Twilio API
const accountSid = 'ACdf00f97c48097253d6344b7a1f6500c2';
const authToken = 'd499c812e3e2766d6d26cea3ab893514';
const client = require('twilio')(accountSid, authToken);

//Mail Listener API
var MailListener = require("mail-listener-fixed2");

var mailListener = new MailListener({
  username: "codetestjazz@outlook.com",
  password: "jazz@12345",
  host: "imap.outlook.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start(); // start listening



mailListener.on("server:connected", function(){
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});

mailListener.on("error", function(err){
  console.log(err);
});

mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log(mail);
let emailString=mail.subject;
  let emailarr=emailString.split(' ');
  let senderID=emailarr[emailarr.length-1];


  // mail processing code goes here

  let messagebody=mail.text;
  let myArray = [];
  
  myArray = messagebody.toString().split('On Mon,'||'On Tue,'||'On Wed,'||'On Thu,'||'On Fri,'||'On Sat,'||'On Sun,');
  let mbody = myArray[0];
  console.log(mbody); 

  const details = [{"Id":"1","Name":"Aravind","Contact-No":"whatsapp:+917012375304","Property-Manager":"Ajith","Property-Manager-Email":"<aravind.ramadas95@gmail.com>"},
    {"Id":"2","Name":"Nelson","Contact-No":"whatsapp:+917034017573","Property-Manager":"Siddharth","Property-Manager-Email":"<siddharthsidson@gmail.com>"},
    {"Id":"3","Name":"Ajith","Contact-No":"whatsapp:+919562164471","Property-Manager":"Siddharth","Property-Manager-Email":"<siddharthsidson@gmail.com>"}]

    //Search inside JSON
    var sendtonum;
    var pManager;
    var name;
        for(let i=0;i<details.length;i++){
            if(senderID == details[i]['Id']){
                name = details[i]['Name']
                sendtonum = details[i]['Contact-No']
                pManager = details[i]['Property-Manager']
            }
        }

    //Twilio code to send message

    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: mbody+'\nWith Regards:'+ pManager,
         to: sendtonum
       })
      .then(message => console.log(message.sid));
});

mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});

