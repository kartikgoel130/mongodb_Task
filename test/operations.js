const assert = require('assert');
const mongoose = require('mongoose');
const Task = require('../models/task');

//Describe Our tests
describe('Operations in our Records', function(){

  this.beforeEach(function(done){
    mongoose.connections.collections.tasks.drop(function(){
      done();
    });
  });


  // Create Tests
  it('Create a Task with the Completion', function(done){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });

    t1.save().then(function(){
      Task.findOne({Description: 'Do Coding for 2hr'}).then(function(record){
        assert(record.Completed === true);
        done();
      });
    });

    t2.save().then(function(){
      Task.findOne({Description: 'Do Exercise for 1hr'}).then(function(record){
        assert(record.Completed === false);
        done();
      });
    });
  });


  //Reading Records which have Completes === false
  
  it('Reading the value of the Task', function(done){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });

    t1.save();

    t2.save().then(function(){
       Task.findOne({Completed: false}).then(function(result){ 
         assert(result.Completed === false);
         done();
      });
    });
  });




   //Update the Record 
   it('Update the value of the Task', function(done){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });

    t1.save();

    t2.save().then(function(){
      Task.findOneUpdate({Completed: false}, {Completed: true}).then(function(){
        Task.findOne({name: 'Do Exercise for 1hr'}).then(function(result){
          asssert(result.Completed === true);
          done();
        });
      });
    });
  });



  //Delete the Record

  it('Deleting the value of the Task', function(done){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });

    t1.save();

    t2.save().then(function(){
      Task.findOneAndRemove({Description: 'Do Coding for 2hr'}).then(function(){
        Task.findOne({Description: 'Do Coding for 2hr'}).then(function(result){
          asssert(result === null);
          done();
        });
      });
    });
  });

});