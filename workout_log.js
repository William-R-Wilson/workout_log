ExerciseList = new Mongo.Collection('exercises');
WorkoutList = new Mongo.Collection('workouts');
WorkoutExercises = new Mongo.Collection('workoutExercises');

if (Meteor.isClient) {
  Meteor.subscribe('theExercises');
  Meteor.subscribe('theWorkouts');
  Meteor.subscribe('theWorkoutExercises');

  Template.workoutExercises.helpers({
    'currentWorkout': function(){
      var currentUserId = Meteor.userId();
      currentWorkoutId = Session.get('selectedWorkout');
      currentWorkout = WorkoutList.findOne(currentWorkoutId);
      if(currentWorkoutId == null){
        return false;
      }
      else {
        return currentWorkout;
      }
    },

    'workoutExercise': function() {
      var currentUserId = Meteor.userId();
      //var selected? = currentWorkout();
      return WorkoutExercises.find({workoutId: Session.get('selectedWorkout')}); //just seeing if this will work
                                                    //can probably avoid passing currentWorkout()
    },
  });

  Template.eachWorkoutExercise.events({
    'click .remove': function(){
      //event.preventDefault();
      var selectedExercise = this._id;
      var confirm = window.confirm("Delete " + this.name + "?");
      if(confirm){
        Meteor.call('removeWeData', selectedExercise);
      }
    },

    'keyup [name=weName]': function(event){
      var exerciseId = this._id;
      var exercise = $(event.target).val();
      Meteor.call('editWeName', exerciseId, exercise);
    },

    'keyup [name=weReps]': function(event){
      var exerciseId = this._id;
      var reps = $(event.target).val();
      Meteor.call('editWeReps', exerciseId, reps);
    },

    'keyup [name=weSets]': function(event){
      var exerciseId = this._id;
      var sets = $(event.target).val();
      Meteor.call('editWeSets', exerciseId, sets);
    },

    'keyup [name=weWeight]': function(event){
      var exerciseId = this._id;
      var weight = $(event.target).val();
      Meteor.call('editWeWeight', exerciseId, weight);
    }
  });

  Template.addWorkoutExercise.events({
    'submit form': function(event){
      event.preventDefault();
      var currentUserId = Meteor.userId();
      var exerciseNameVar = event.target.workoutExerciseName.value;
      console.log(exerciseNameVar);
      var workoutId = Session.get('selectedWorkout');
      console.log(workoutId);
      if(workoutId === null){
        console.log("select a workout!");
        return;
      }
      else {
        event.target.workoutExerciseName.value = "";
        Meteor.call('insertWorkoutExercise', exerciseNameVar, workoutId, currentUserId);
      }
    }
  });

  Template.addWorkout.rendered = function(){
    $('.datetimepicker').datetimepicker();
  };

  Template.addWorkout.events({
    'submit form': function(event){
      event.preventDefault();
      var currentUserId = Meteor.userId();
      var workoutDateVar = event.target.workoutDate.value;
      console.log(workoutDateVar);
      console.log(currentUserId);
      event.target.workoutDate.value = "";
      Meteor.call('insertWorkoutData', workoutDateVar, currentUserId);
    }
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
    }

  });

  Template.exercises.helpers({
    'exercise': function() {
      var currentUserId = Meteor.userId();
      return ExerciseList.find();
    },
    'selectedClass': function(){
      var exerciseId = this._id;
      var selectedExercise = Session.get('selectedExercise');
      if(exerciseId == selectedExercise) {
        return "selected"
      }
    }
  });

  Template.addExercise.events({
    'submit form': function(event){
      event.preventDefault();
      var exerciseNameVar = event.target.exerciseName.value;
      var currentUserId = Meteor.userId();
      Meteor.call('insertExerciseData', exerciseNameVar);
    }
  });

  Template.eachExercise.events({
    'click .remove': function(){
      //event.preventDefault();
      var selectedExercise = this._id;
      var confirm = window.confirm("Delete " + this.name + "?");
      if(confirm){
        Meteor.call('removeExerciseData', selectedExercise);
      }
    },

    'keyup [name=exerciseName]': function(event){
      var exerciseId = this._id;
      var exercise = $(event.target).val();
      Meteor.call('editExerciseName', exerciseId, exercise);
    },

    'keyup [name=exerciseReps]': function(event){
      var exerciseId = this._id;
      var reps = $(event.target).val();
      Meteor.call('editExerciseReps', exerciseId, reps);
    },

    'keyup [name=exerciseSets]': function(event){
      var exerciseId = this._id;
      var sets = $(event.target).val();
      Meteor.call('editExerciseSets', exerciseId, sets);
    },

    'keyup [name=exerciseWeight]': function(event){
      var exerciseId = this._id;
      var weight = $(event.target).val();
      Meteor.call('editExerciseWeight', exerciseId, weight);
    }
  });
}
