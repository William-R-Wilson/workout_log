Template.selectWorkoutExercise.helpers({
  'exercises': function(){
    var exercises = template.subscribe('theExercises');
    return exercises
  }
});
