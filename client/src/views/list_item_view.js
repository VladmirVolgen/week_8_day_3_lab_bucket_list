const createAndAppend = require('../helpers/create_append.js');

const ListItemView = function (data, container) {
  this.data = data;
  this.container = container;
};

ListItemView.prototype.render = function () {
  const li = createAndAppend('li', null, this.data.name , this.container )
  let completed = []
  if (this.data.completed) {
    completed = "Completed"
  } else {
    completed = "Not Completed"
  }
  createAndAppend('span', 'box', completed, li)
};

module.exports = ListItemView;
