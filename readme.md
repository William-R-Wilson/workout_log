example server/smtp.js will need to be set to mail password reset:

```Meteor.startup(function(){
  smtp = {
    "username": "email@example.com",   // eg: server@gentlenode.com
    "password": "uniquepasswordhere",   // eg: 3eeP1gtizk5eziohfervU
    "server":   "smtp.gmail.com",  // eg: mail.gandi.net
    "port": 587
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});```
