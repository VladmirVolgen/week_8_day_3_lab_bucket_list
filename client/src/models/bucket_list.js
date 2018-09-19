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
      console.log(list);
      PubSub.publish('BucketList:data-loaded', list)
    })
    .catch(console.error);
};

module.exports = BucketList;
