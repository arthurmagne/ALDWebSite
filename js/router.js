
crossroads.addRoute('/{section}', function(section){
});

var a = document.querySelectorAll('a')
for(i=0;i<a.length;i++){
    a[i].onclick=function(e){
        e.preventDefault();
        console.log(this.href.split('/').pop());
        crossroads.parse('/' + this.href.split('/').pop());
        window.location.href = this.href;
        window.history.pushState("object", "title", this.href.split('/').pop().split('.html'));
    }
}
crossroads.parse('/home');