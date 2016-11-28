Meteor.publish('theExercises', function(){
    var currentUserId = this.userId;
    return ExerciseList.find({createdBy: currentUserId})
});

Meteor.publish('theWorkouts', function(pageCount){
//Meteor.publish('theWorkouts', function(){
  var currentUserId = this.userId;
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });
  check(pageCount, positiveIntegerCheck);

  Counts.publish(this, 'workoutCount', WorkoutList.find(), {
    noReady: true
  });

  return WorkoutList.find({createdBy: currentUserId}, {
    limit: 5,
    skip: pageCount,
    sort: {date: -1}
  });
});

Meteor.publish('theWorkoutExercises', function(){
  var currentUserId = this.userId;
  return WorkoutExercises.find({createdBy: currentUserId})
});
