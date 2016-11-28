  Meteor.methods({

//exercise methods

    'insertExerciseData': function(exerciseNameVar){
      var currentUserId = Meteor.userId();
      ExerciseList.insert({
        name: exerciseNameVar,
        }
      )
    },

    'removeExerciseData': function(selectedExercise){
      //var currentUserId = Meteor.userId();
        ExerciseList.remove(selectedExercise);
    },

    'editExerciseName': function(exerciseId, exercise){
        ExerciseList.update({_id: exerciseId},
          {$set: {name: exercise}});
    },
    'editExerciseReps': function(exerciseId, reps){
        ExerciseList.update({_id: exerciseId},
          {$set: {reps: reps}});
    },
    'editExerciseSets': function(exerciseId, sets){
        ExerciseList.update({_id: exerciseId},
          {$set: {sets: sets}});
    },
    'editExerciseWeight': function(exerciseId, weight){
        ExerciseList.update({_id: exerciseId},
          {$set: {weight: weight}});
    },

//workout methods

    'insertWorkoutData': function(date, user){
      console.log("insertWorkoutData called");
      check(date, String);
      WorkoutList.insert({
        date: date,
        createdBy: user
      });
    },

    'deleteWorkoutData': function(workoutId, currentUserId){
      console.log("deleteWorkoutData called");
      console.log(workoutId + " " + currentUserId);
      //WorkoutExercise.remove(_id: workoutId); //the equivalent of dependent: :destroy I guess?
      WorkoutList.remove({_id: workoutId, createdBy: currentUserId});
    },

//WorkoutExercise methods
    'insertWorkoutExercise': function(name, workoutId, currentUserId){
      console.log("insertWorkoutExercise called with " + name + " and " + workoutId);
      WorkoutExercises.insert({
        name: name,
        weight: 0,
        sets: 0,
        reps: 0,
        workoutId: workoutId,
        createdBy: currentUserId
      });
    },

    'removeWeData': function(selectedExercise){
      //var currentUserId = Meteor.userId();
        WorkoutExercises.remove(selectedExercise);
    },

    'editWeName': function(exerciseId, exercise){
      check(exercise, String);
      WorkoutExercises.update({_id: exerciseId},
        {$set: {name: exercise}});
    },
    'editWeReps': function(exerciseId, reps){
        check(reps, Number);
        WorkoutExercises.update({_id: exerciseId},
          {$set: {reps: reps}});
    },
    'editWeSets': function(exerciseId, sets){
      check(sets, Number);
      WorkoutExercises.update({_id: exerciseId},
        {$set: {sets: sets}});
    },
    'editWeWeight': function(exerciseId, weight){
      check(weight, Number);
      WorkoutExercises.update({_id: exerciseId},
        {$set: {weight: weight}});
    }

  });
