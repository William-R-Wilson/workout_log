Meteor.publish('theExercises', function(){
    var currentUserId = this.userId;
    return ExerciseList.find({createdBy: currentUserId})
});

Meteor.publish('theWorkouts', function(){
  var currentUserId = this.userId;
  return WorkoutList.find({createdBy: currentUserId})
});

Meteor.publish('theWorkoutExercises', function(){
  var currentUserId = this.userId;
  return WorkoutExercises.find({createdBy: currentUserId})
});
