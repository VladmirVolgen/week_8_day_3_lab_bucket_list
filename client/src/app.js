const FormView = require('./views/form_view.js');
const BucketList = require('./models/bucket_list.js');


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const formView = new FormView(form);
  formView.bindEvents();

  const bucketList = new BucketList('http://localhost:3000/api/list')
  bucketList.bindEvents();
  bucketList.getData();
})
