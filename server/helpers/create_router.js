const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => {
        res.json(docs)
      });

  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne( { _id: ObjectID(id) } )
    .then((doc) => {
      res.json(doc);
    });
  });

  router.post('/', (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then(() => {
        collection
        .find()
        .toArray()
        .then((docs) => {
          res.json(docs);
      });
    });

  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .deleteOne( {_id: ObjectID(id) } )
    .then (() => {
      return collection.find().toArray();
      })
        .then((docs) => {
          res.json(docs);
    });
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log('reqbody', req.body);

    collection.updateOne(
      {_id: ObjectID(id)},
      { $set: updatedData}
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  return router;

};

module.exports = createRouter;
