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

  this.createEditOption(li);
  this.createDeleteButton(li);

};

ListItemView.prototype.createDeleteButton = function (parent) {
  const button = createAndAppend('button', 'delete-button', 'delete', parent);
  button.value = this.data._id

  button.addEventListener('click', (e) => {
    PubSub.publish('ListItemView:delete-clicked', e.target.value);

  });
};

  ListItemView.prototype.createEditOption = function (parent) {
    const select = createAndAppend('select', null, '', parent);
    const option1 = createAndAppend('option', null, 'Yes', select);
    const option2 = createAndAppend('option', null, 'No', select);
    option1.value = true;
    option2.value = false;

    select.addEventListener('change', (e) => {
      console.log(this);
      PubSub.publish('ListItemView:edit-completed', this);

    });
  };



module.exports = ListItemView;
