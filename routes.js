Router.configure({
  layoutTemplate: 'main'
});

Router.route('/:page?', {
  name: 'home',
  template: 'home'
});
Router.route('/register');
