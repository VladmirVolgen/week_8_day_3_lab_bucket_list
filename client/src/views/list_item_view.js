const createAndAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');

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
  createAndAppend('span', 'box', completed, li);
  this.createDeleteButton(li)
};

ListItemView.prototype.createDeleteButton = function (parent) {
  const button = createAndAppend('button', 'delete-button', 'delete', parent);
  button.value = this.data._id

  button.addEventListener('click', (e) => {
    PubSub.publish('ListItemView:delete-clicked', e.target.value);

  })

};


module.exports = ListItemView;
