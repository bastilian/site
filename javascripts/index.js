import Site from './site.js';

(function(){
  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0, len=a.length; i < len; ++i){
        if (a[i]!=b[i]) return a[i ]< b[i]?-1:1;
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


(function () {
  var site = new Site('/user.json');
})();
