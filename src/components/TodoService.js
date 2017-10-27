import Realm from 'realm';
import TodoModel from './TodoModel';
import Utils from './Utils';
import RNBackbone from 'react-native-backbone';
import realmStorage from 'react-native-backbone/src/storages/realm';
/*
let repository = new Realm({
    schema: [{
	name: 'Todo',
	primaryKey: 'id',
	properties: {
	    id: {type: 'string',indexed: true},
	    title: 'string',
	    completed: 'bool',
	    createdAt: 'date',
	    updatedAt: 'date'
	}
    }]
}
)

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) {
      sortBy = [['completed', true], ['updatedAt', false]];
    }
    console.log( 'repo '+ JSON.stringify(repository.objects('Todo')));
    
    return repository.objects('Todo');
  },

  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
      console.log( 'repo '+ JSON.stringify(repository.objects('Todo')));
    })
  },

  update: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  },
  clearCompleted: function(callback) {
    if (!callback) return;
    repository.write(() => {
      let allCompleted = repository.objects('Todo').filtered('completed == true');
      repository.delete(allCompleted);
      callback();
    });
  },
  remove: function(todo,callback) {
    if (!callback) return;
    repository.write(() => {
      repository.delete(todo);
      callback();
  }
);
  
  }
};
/*
TodoService.save(new TodoModel('Hello Koding'));
TodoService.save(new TodoModel('Make a Todo App with React Native'));
TodoService.save(new TodoModel('Check to complete a todo'));
TodoService.save(new TodoModel('Save data with Realm'));*/

RNBackbone.storage = realmStorage;

var Todo = RNBackbone.Model.extend({
  realmSchema:{
    name: 'Todo',
    primaryKey: 'id',
    properties: {
        id: {type: 'string', indexed: true},
        title: 'string',
        completed: 'bool',
        createdAt: 'date',
        updatedAt: 'date'
    }
  }
});
let repository = new Realm({
  schema: [{
name: 'Todo',
primaryKey: 'id',
properties: {
    id: {type: 'string',indexed: true},
    title: 'string',
    completed: 'bool',
    createdAt: 'date',
    updatedAt: 'date'
}
  }]
});

var Todos = RNBackbone.Collection.extend({
  model: Todo
});

realmStorage.init({
  models: [Todo]
});

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) {
        sortBy = [['completed', true], ['updatedAt', false]];
    }

    var todos = this.todos = new Todos();
    todos.fetch({
      success: () => {
        console.log(todos.models)
      }
    })
    return todos.models
  },
  save: function(todo) {
    var todo = new Todo({
      id : Utils.guid(),
      title: todo.title,
      completed: false,
      createdAt:  new Date(),
      updatedAt:  new Date()
    })
   todo.save(null, {
      success: () =>{
        console.log("Todo is saved")
      }
    })
  },
  update: function(todo,callback){
    repository.write(() => {
      todo.updatedAt = new Date();
      alert(todo.completed)
      if(todo.completed == false) {
        todo.completed = true
        alert(todo.completed)
      }
      else todo.completed = false
      var todos = this.todos = new Todos();
      todos.fetch({
        success: () => {
          console.log(todos.models)
        }
      })
      callback()
    })
     
  },
  clearCompleted: function(){

  },
  remove: function(todo){

 
  }
}
module.exports = TodoService;
