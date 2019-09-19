(function(){
  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }

  function mx(f) {
    return this.sortBy(f)[this.length-1];
  }

  function mn(f) {
    return this.sortBy(f)[0];
  }

  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    try{Object.defineProperty(Array.prototype,'max',{value:mx}); }catch(e){}
    try{Object.defineProperty(Array.prototype,'min',{value:mn}); }catch(e){}
  }

  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
  if (!Array.prototype.max) Array.prototype.max = mx;
  if (!Array.prototype.min) Array.prototype.min = mn;
})();

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function empty(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

function el(tag) {
  return document.createElement(tag);
}

function html(aHTMLString) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(aHTMLString, "text/html")

  return doc;
}
