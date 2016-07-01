document.getElementById('mkEditor').onkeyup = function(event){
    if(event.key === 'Enter'){
        if(!event.ctrlKey){
            document.getElementById('mkViewer').innerHTML = markdown.toHTML(this.value, 'Maruku');
        }else{
            alert('post');
        }
    }
        
};