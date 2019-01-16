// CLASSES

function Column(name) {
  this.id = randomString();
  this.name = name;
  this.element = generateTemplate('column-template', { name: this.name, id: this.id });
  this.element.querySelector('.column').addEventListener('click', (event) => {
	  if (event.target.classList.contains('btn-delete')) {
	    this.removeColumn();
	  }

	  if (event.target.classList.contains('add-card')) {
	    this.addCard(new Card(prompt("Enter the name of the card")));
	  }
	});

  this.addCard = (card) => {
  	this.element.querySelector('ul').appendChild(card.element)
  }
  this.removeColumn = () => {
  	this.element.parentNode.removeChild(this.element)
  }
}

function Card(description) {
  this.id = randomString();
  this.description = description;
  this.element = generateTemplate('card-template', { description: this.description }, 'li');
  this.element.querySelector('.card').addEventListener('click', (event) => {
	  event.stopPropagation();

	  if (event.target.classList.contains('btn-delete')) {
	    this.removeCard();
	  }
	});
  this.removeCard = () => {
  	this.element.parentNode.removeChild(this.element)
  }
}

// OBJECTS

var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id); 
      // adding a random color to every created card
	  let randomColor = Math.floor(Math.random()*16777215).toString(16);
      column.element.querySelector('.column').style.backgroundColor = "#" + randomColor;
    },
    element: document.querySelector('#board .column-container')
};

//Button add column action 

document.querySelector('#board .create-column').addEventListener('click', function() {
    var name = prompt('Enter a column name');
    var column = new Column(name);
    board.addColumn(column);
});

// WINDOW ACTIONS / MAIN

document.addEventListener('DOMContentLoaded', function() {	

	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');


	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doneColumn.addCard(card2);
    
});

// FUNCTIONS

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function generateTemplate(name, data, basicElement) {
  var template = document.getElementById(name).innerHTML;
  var element = document.createElement(basicElement || 'div');

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
}

function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true
  });
}



