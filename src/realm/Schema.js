var Realm = require('realm');

const FictionSchema = {
  name: 'Fiction',
  primaryKey: 'key',
  properties: {
    key: 'string',
    title: 'string',
    author: 'string',
    img: 'string',
    url: 'string',
    desc: 'string',
    current: {type: 'int', default:-1},
    chapters: {type: 'list', objectType:'Chapter'}
  }
};

const ChapterSchema = {
  name: 'Chapter',
  primaryKey: 'url',
  properties: {
    title: 'string',
    date: 'string',
    url: 'string',
    content: 'string',
    offset: {type:'int', default:0},
    status: {type:'string', default:'unread'} //unread, read, new
  }
}

let realm = new Realm({schema: [FictionSchema, ChapterSchema]});

module.exports = realm;