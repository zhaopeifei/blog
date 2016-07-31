
var ajax = (function(){
    var request = function(method, value, path, success, failure){
        if(!window.XMLHttpRequest){
            alert('浏览器不支持XMLHttpRequest。换句话说，浏览器太low了，换个吧~');
            return;
        }

        var xhr = new XMLHttpRequest();

        xhr.open(method, path, true);

        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if((xhr.status === 200)){
                    if(success){
                        success(JSON.parse(xhr.responseText));
                    }
                }else{
                    if(failure){
                        failure(JSON.parse(xhr.responseText));
                    }
                }
            }
        };

        //要修改请求内容类型，这样后端才能解析
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(value));
    };
    return {
        get: function(path, success, failure){
            request('get', null, path, success, failure);  
        },
        post: function(value, path, success, failure){
            request('post', value, path, success, failure);
        },
        put: function(value, path, success, failure){
            request('put', value, path, success, failure);
        },
        delete: function(value, path, success, failure){
            request('delete', value, path, success, failure);
        }
    };
})();


var myModule = angular.module('myModule', ['kityminderEditor','ngSanitize']);

myModule.controller('MinderController', function($scope,$http) {
    //初始化脑图数据
    $scope.initEditor = function(editor, minder) {
        window.editor = editor;
        window.minder = minder;
        $scope.$parent.$broadcast("minderReady",null);
    };

    //加载脑图数据
    $http.get('/blogs/minder').success(function(res){
        editor.minder.importJson(res);
    });

    $scope.saveMinderData = function(event){
        if(event.key === 'Enter' || event.key === "Delete"){
            $http.put('/blogs/minder/peyton',editor.minder.exportJson())
                .then(function(res){
                        console.log(res.data.show);
                    },function(res){
                        alert('保存失败');
                    });
        }
    };
});

myModule.controller('BlogController', function($scope, $http) {
    $scope.blogs = [];
    $scope.name = "blogs";
    $scope.$on("minderReady",function(){
        window.minder.on("selectionchange", function(){
            if(!minder.getSelectedNodes().length){
                return;
            }

            $http.get('/blogs/blog?category='+minder.getSelectedNodes()[0].data.text)
            .then(function(res){
                    $scope.blogs = [];
                    angular.forEach(res.data, function(value, key){
                        $scope.blogs.push({ 
                            id: value._id,
                            content: value.content,
                            html: marked(value.content)
                        });
                    },function(res){
                        alert(res.data.show);
                    });
            });
        });
    });

    $scope.blogEditor = function(event){
        var editor = event.currentTarget.parentNode.parentNode.parentNode.children[0];
        if(editor.style.display === "none"){
            editor.style.display = "block";
            event.currentTarget.innerHTML = "保存";
        }else{
            editor.style.display = "none";
            event.currentTarget.innerHTML = "修改";
        }
    };

    $scope.createBlog = function(event){
        if(!minder.getSelectedNodes().length){
            alert('请选择脑图相应的节点');
        }

        $http.post('/blogs/blog/peyton',{
                    category: minder.getSelectedNodes()[0].data.text,
                    title: '',
                    content: ''
                }).then(function(res){
                            $scope.blogs.push({
                                id: res.data._id,
                                content: res.data.content,
                                html: ''
                            });
                        },function(res){
                            alert(res.data.show);
                        });
        
    };

    $scope.updateBlog = function(event){
        if(event.key === "Enter"){
            var editor = event.currentTarget;
            var container = editor.parentNode.parentNode;
            var viewer = container.children[1].children[0];
            viewer.innerHTML = marked(editor.value);

            if(!minder.getSelectedNodes().length){
                $http.put('/blogs/blog/peyton',{
                    id: container.children[1].id,
                    title: editor.value.match(/.+/)[0],
                    content: editor.value
                }).then(function(res){
                            console.log(res.data.show);
                        },function(res){
                            alert(res.data.show);
                        });
            }else{
                $http.put('/blogs/blog/peyton',{
                    id: container.children[1].id,
                    category: minder.getSelectedNodes()[0].data.text,
                    title: editor.value.match(/.+/)[0],
                    content: editor.value
                }).then(function(res){
                            console.log(res.data.show);
                        },function(res){
                            alert(res.data.show);
                        });
            }
        }
    };

    $scope.deleteBlog = function(event, scope){
        blogId = event.currentTarget.parentNode.parentNode.id;

        $http.delete('/blogs/blog/peyton?id='+blogId).success(function(res){
            for(var i=0,len=$scope.blogs.length; i<len; i++){
                if($scope.blogs[i].id === blogId){
                    $scope.blogs.splice(i,i);
                    break;
                }
            }
        });
    };
});

