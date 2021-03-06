import Realm from 'realm';
import TodoModel from './TodoModel';

import RNBackbone from 'react-native-backbone';
import realmStorage from 'react-native-backbone/src/storages/realm';

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

module.exports = TodoService;
