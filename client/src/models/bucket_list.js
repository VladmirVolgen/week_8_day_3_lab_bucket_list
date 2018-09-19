const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function (url) {
  this.url = url;
  this.listItem = [];
  this.items = [];
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
    this.updateData(e);
  })
};

BucketList.prototype.getData = function () {
  this.request.get()
    .then((list) => {
      this.items = list
      PubSub.publish('BucketList:data-loaded', this.items);
    })
    .catch(console.error);
};

BucketList.prototype.postData = function (item) {
  this.request.post(item)
    .then((list) => {
      this.items = list
      PubSub.publish('BucketList:data-loaded', this.items)
    })
    .catch(console.error);
};

BucketList.prototype.deleteData = function (id) {

  this.request.delete(id)

    .then((list) => {
      this.items = list;
      PubSub.publish('BucketList:data-loaded', list)
    })
    .catch(console.error);
};

BucketList.prototype.updateData = function (data) {
  const id = data.detail[0];
  const atributes = { completed: data.detail[1] };
  // console.log('id:', id);
  // console.log('atributes:', atributes);

  this.request.put(id, atributes)
    .then((list) => {
      console.log('list', list);
      this.items = list;
      PubSub.publish('BucketList:data-loaded', this.items);
    })
    .catch(console.error);
};

module.exports = BucketList;
