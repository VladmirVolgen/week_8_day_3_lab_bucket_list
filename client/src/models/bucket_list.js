const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function (url) {
  this.url = url
  this.listItem = []
  this.request = new Request(this.url)
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:submitted', (e) => {
    this.listItem = e.detail;
    this.postData(this.listItem);
  });
  PubSub.subscribe('ListItemView:delete-clicked', (e) => {
    this.deleteData(e.detail);
  });
  PubSub.subscribe('ListItemView:edit-completed', (e) => {
    // const id = e.detail.data._id;
    // const item = {name: e.detail.data.name, completed: e.detail.data.completed}
    // console.log('e.detail:', e.detail);
    // console.log('id', id);
    // console.log('item', item);
    this.updateData(e);
  })
};

BucketList.prototype.getData = function () {
  this.request.get()
    .then((list) => {
      PubSub.publish('BucketList:data-loaded', list);
    })
    .catch(console.error);
};

BucketList.prototype.postData = function (item) {
  this.request.post(item)
    .then((list) => {
      PubSub.publish('BucketList:data-loaded', list)
    })
    .catch(console.error);
};

BucketList.prototype.deleteData = function (id) {

  this.request.delete(id)

    .then((list) => {
      PubSub.publish('BucketList:data-loaded', list)
    })
    .catch(console.error);
};

BucketList.prototype.updateData = function (e) {
  const id = e.detail.data._id;
  const item = {"completed": e.detail.data.completed}
  console.log('id:', id);
  console.log('item:', item);

  this.request.put(id, item)
    .then((list) => {
      PubSub.publish('BucketList:data-loaded', list);
    })
    .catch(console.error);
};

module.exports = BucketList;
