require('dotenv').config();
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var wellcome_templateDir = path.join(__dirname, 'email_templates', '/../wellcome');
var wellcome_email = new EmailTemplate(wellcome_templateDir);


function sendEmail(user){
    wellcome_email.render({
        name: user.email,
        msg: user.msg,
    }, function(err, result){
        if(err){console.log(err)}
        else{
            //console.log("sucess "+result);
            sendMsg(result.html, user);

        };
    })
};




function sendMsg(html, user){
    mailgun.messages().send({
        from: 'Patrick Muhire <pmuhire2@gmail.com>',
        to: user.email,
        subject: "Sign in link",
        html: html
    },   function(error, body){

        if(error) console.log(error);

        else console.log(body);

    });
};



module.exports = {
    sendEmail:sendEmail,
}