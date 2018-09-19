const PubSub = require('../helpers/pub_sub.js');

const FormView = function (form) {
  this.form = form;
};

FormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (e) => {
    this.handleSubmit(e);
  });

};

FormView.prototype.handleSubmit = function (e) {
  e.preventDefault();
  const newListItem = this.createElement(e.target);
  PubSub.publish('FormView:submitted', newListItem);
  console.log(newListItem);
  e.target.reset();
};

FormView.prototype.createElement = function (form) {
  const newListItem = {
    name: form.name.value,
    completed: form.completed.value
  };

  return newListItem
};




module.exports = FormView;
