const createAndAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');

const ListItemView = function (data, container) {
  this.data = data;
  this.container = container;
};

ListItemView.prototype.render = function () {
  const li = createAndAppend('li', null, this.data.name , this.container )
  let completed = []
  console.log(this.data.completed);
  // if (this.data.completed === true || "true") {
  //   completed = "Completed"
  // } else if (this.data.completed === false || "false") {
  //   completed = "Not Completed"
  // }

  // if (!this.data.completed || completed === "false") {
  //   completed = "Not completed";
  // } else {
  //   completed = "Completed";
  // }
  console.log(completed);
  createAndAppend('span', 'box', this.data.completed , li);

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
    const option3 = createAndAppend('option', null, '', select);
    option3.selected = true;
    option3.disabled = true;
    const option1 = createAndAppend('option', null, 'Completed', select);
    const option2 = createAndAppend('option', null, 'Not completed', select);
    option1.value = "Completed";
    option2.value = "Not completed";

    select.addEventListener('change', (e) => {
      console.log('target.value', e.target.value);
      const info = [this.data._id, e.target.value]
      PubSub.publish('ListItemView:edit-completed', info);

    });
  };



module.exports = ListItemView;
