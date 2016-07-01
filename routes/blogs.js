var express = require('express');
var router = express.Router();

//var Models = require('../database/db.js');
var markdown = require('markdown').markdown;

router.get('/',function(req, res, next){
    // Models.Post.find(function(err,posts){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         //console.log(post.content);
    //         var context = {
    //             posts: posts.map(function(post){
    //                 return {
    //                     title: post.title,
    //                     buildDate: post.buildDate,
    //                     createDate: post.createDate,
    //                     content: markdown.toHTML(post.content)
    //                 };
    //             })
    //         };
    //         res.render('blogs',context);
    //     }
    // });
});

//博文管理页面
router.get('/peyton', function(req, res, next){
    res.render('blogs_peyton', { layout: 'main_peyton', pageName: 'blogs_peyton'});
});

//新增博文
router.post('/peyton', function(req, res, next){
    //category是否存在？

    // var postNew = new Models.Post({
    //     title: "标题",
    //     category: "javascript",
    //     content: "this is content"
    // }).save(function(err, post){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(post);
    //     }
    // });

});

//更新博文
router.put('/peyton', function(req,res,next){

});

//删除博文
router.post('/peyton', function(req,res,next){

});

module.exports = router;