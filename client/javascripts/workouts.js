Template.workouts.onCreated(function() {
  var template = this;
  template.autorun(function(){
    var currentPage = parseInt(Router.current().params.page) || 1;
    var skipCount = (currentPage -1) * 5;
    template.subscribe('theWorkouts', skipCount);
  });

});

Template.workouts.helpers({
  'workout': function() {
    var currentUserId = Meteor.userId();
    return WorkoutList.find({}, {sort: {date:-1}});
  },
  'selectedWorkout': function(){
    var workoutId = this._id;
    var thisWorkout = Session.get('selectedWorkout');
    if(workoutId == thisWorkout){
      return 'selected';
    }
  },
  'workoutExercises': function(){
    var currentUserId = Meteor.user.Id();
    var thisWorkout = Session.get('selectedWorkout');
    return WorkoutList.find({workout_id: thisWorkout});
  },
  'newerWorkoutsClass': function(){
    return currentPage() <= 1 ? "disabled" : "";
  },
  'olderWorkoutsClass': function(){
    return hasMorePages() ? "" : "disabled";
  }

});

Template.workouts.events({
  'click #deleteWorkout': function() {
    var currentUserId = Meteor.userId();
    var workoutId = this._id;
    Meteor.call('deleteWorkoutData', workoutId, currentUserId);
  },

  'click .selectWorkout': function(){
    Session.set('selectedWorkout', this._id);
    var currentUserId = Meteor.userId();
  },
  'click #prevPage': function(e){
    e.preventDefault();
    console.log("clicked newer workouts!");
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    console.log(previousPage);
    Router.go('home', {page: previousPage});
  },
  'click #nextPage': function(e){
    e.preventDefault();
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    console.log(nextPage);
    Router.go('home', {page: nextPage});
  }

});

var hasMorePages = function() {
  var totalWorkouts = Counts.get('workoutCount');
  return currentPage() * parseInt(5) < totalWorkouts;
}

var currentPage = function(){
  return parseInt(Router.current().params.page) || 1;
}
