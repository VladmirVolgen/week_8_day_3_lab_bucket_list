const FormView = require('./views/form_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const formView = new FormView(form);
  formView.bindEvents();
})
