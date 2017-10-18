import Realm from 'realm';
import TodoModel from './TodoModel';

import RNBackbone from 'react-native-backbone';
import realmStorage from 'react-native-backbone/src/storages/realm';

//USING Realm
let repository = new Realm({
    schema: [{
	name: 'Todo',
	primaryKey: 'id',
	properties: {
	    id: {type: 'string', indexed: true},
	    title: 'string',
	    completed: 'bool',
	    createdAt: 'date',
	    updatedAt: 'date'
	}
    }]
});

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', true], ['updatedAt', false]];
    console.log( 'repo '+ JSON.stringify(repository.objects('Todo')));
    
    return repository.objects('Todo');
  },

  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    })
  },

  update: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  },
  remove: function(todo,callback) {
    if (!callback) return;
    repository.write(() => {
      repository.delete(todo);
    });
    
  }
};
/*
TodoService.save(new TodoModel('Hello Koding'));
TodoService.save(new TodoModel('Make a Todo App with React Native'));
TodoService.save(new TodoModel('Check to complete a todo'));
TodoService.save(new TodoModel('Save data with Realm'));*/

module.exports = TodoService;
 
//USING Backbone Realm
/*
RNBackbone.storage = realmStorage;
var repository = RNBackbone.Model.extend({
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

var repositories = RNBackbone.Collection.extend({
  model: repository
});

realmStorage.init({
  models: [repository]
});

var repository = new repositories();
let TodoService = {
  findAll: function(sortBy) {
    console.log('repository'+repository);
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    repository.fetch({
      success: ()=>{
        console.log('repository'+JSON.stringify(repository));
        return repository
      }
    });
    return repository
   //return console.log('this tis sort')
  },

  save: function(todo) {
    console.log("save")
    repository.fetch({
      success: ()=>{
        console.log('repository'+JSON.stringify(repository));
        return repository
      }
    });
  },

  update: function(todo, callback) {
    console.log("update")
  },
  remove: function(todo) {
    console.log('remove'+todo);
  }
};
TodoService.save(new TodoModel('Hello Koding'));
TodoService.save(new TodoModel('Make a Todo App with React Native'));
TodoService.save(new TodoModel('Check to complete a todo'));
TodoService.save(new TodoModel('Long press, drag and drop a todo to sort'));
TodoService.save(new TodoModel('Save data with Realm'));
TodoService.save(new TodoModel('Sync data with Firebase'));

module.exports = TodoService;
*/