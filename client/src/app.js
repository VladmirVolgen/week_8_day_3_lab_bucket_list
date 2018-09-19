const FormView = require('./views/form_view.js');
const BucketList = require('./models/bucket_list.js');
const ListView = require('./views/list_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const formView = new FormView(form);
  formView.bindEvents();

  const bucketList = new BucketList('http://localhost:3000/api/list')
  bucketList.bindEvents();
  bucketList.getData();

  const list = document.querySelector('#list');
  const listView = new ListView(list);
  listView.bindEvents();
})
