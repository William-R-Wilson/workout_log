Meteor.startup(function(){

smtp = {
  username: 'test2',   // eg: server@gentlenode.com
  password: 'test2',   // eg: 3eeP1gtizk5eziohfervU
  server:   'smtp.gmail.com',  // eg: mail.gandi.net
  port: 25
}

process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
