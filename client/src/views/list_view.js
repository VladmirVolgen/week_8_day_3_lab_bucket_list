const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');
const ListItemView = require('./list_item_view.js');

const ListView = function (container) {
  this.container = container;
  this.list = []
};

ListView.prototype.bindEvents = function () {
  PubSub.subscribe('BucketList:data-loaded', (e) => {
    this.list = e.detail;
    this.handleList()

  });
};

ListView.prototype.handleList = function () {
  this.container.innerHTML = ''
  const ul = createAndAppend('ul', null, '', this.container);
  this.renderList(ul)
};

ListView.prototype.renderList = function (ul) {
  this.list.forEach((listItem) => {
    let item = new ListItemView(listItem, ul);
    item.render();
    // render function for listItem
  })
};



module.exports = ListView;
