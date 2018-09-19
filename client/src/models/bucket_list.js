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
  })
};

BucketList.prototype.getData = function () {
  this.request.get()
    .then((list) => {
      console.log(list);
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
    console.log(id);
};

module.exports = BucketList;
