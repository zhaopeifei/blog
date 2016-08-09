var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blogs');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String, unique: true}, //title是独一无二的
    category: String,
    content: String,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
    if(this.isNew){
        this.createDate = this.updateDate = Date.now();
    }else{
        this.updateDate = Date.now();
    }

    next();
});

postSchema.pre('update', function(next){
    this.update({},{$set: { updateDate: Date.now()} });
    next();
});

var minderSchema = new Schema({
    name: {type: String, unique: true}, //title是独一无二的
    content: String,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});
// postSchema.methods.testAdd = function testAdd(err, result){
//     this.model('Post').find({ title: this.title}, function(err, posts){
//             if(posts) return true;
//             return false;
//         }
//     );
// };

// postSchema.statics.isExist = function isExist(title){
//     this.find({ title: title}, function(err, posts){
//         if(err){
//             console.log(err);
//         }else{
//             if(posts) {
//                 console.log('db exist'); 
//                 return true;
//             }else{
//                 console.log('db not');
//                 return false;
//             }
//         }
//     });
// };

// postSchema.statics.findByCategory = function(category, cb){
//     this.find({category: category}, cb);
// };

// postSchema.statics.findByTitle = function (title, cb) {
//   this.findOne({ title: title }, cb);
// };

exports.Post = db.model('Post',postSchema);
exports.Minder = db.model('Minder',minderSchema);