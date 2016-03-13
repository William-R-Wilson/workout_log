ExerciseList = new Mongo.Collection('exercises');
WorkoutList = new Mongo.Collection('workouts');

if (Meteor.isClient) {

  Meteor.subscribe('theExercises');

  Template.exercises.helpers({
    'exercise': function() {
      var currentUserId = Meteor.userId();
      return ExerciseList.find()
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



if (Meteor.isServer) {
  Meteor.publish('theExercises', function(){
      var currentUserId = this.userId;
      return ExerciseList.find({createdBy: currentUserId})
  });

  Meteor.methods({
    'insertExerciseData': function(exerciseNameVar){
      var currentUserId = Meteor.userId();
      ExerciseList.insert({
        name: exerciseNameVar,
        weight: 0,
        sets: 0,
        reps: 0,
        createdBy: currentUserId
        }
      )
    },

    'removeExerciseData': function(selectedExercise){
      //var currentUserId = Meteor.userId();
        ExerciseList.remove(selectedExercise);
    },

    'editExerciseName': function(exerciseId, exercise){
        ExerciseList.update({_id: exerciseId}, {$set: {name: exercise}});
    },
    'editExerciseReps': function(exerciseId, reps){
        ExerciseList.update({_id: exerciseId}, {$set: {reps: reps}});
    },
    'editExerciseSets': function(exerciseId, sets){
        ExerciseList.update({_id: exerciseId}, {$set: {sets: sets}});
    },
    'editExerciseWeight': function(exerciseId, weight){
        ExerciseList.update({_id: exerciseId}, {$set: {weight: weight}});
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
