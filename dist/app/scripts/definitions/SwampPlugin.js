define(["EventEmitter"],function(a){function b(b){this.super=a,this.super(),this.id=b.id,this.name=b.name,this.basePath=b.basePath,this.version=b.version,this.main=b.main||"index.html",this.config=b.config,this._loaded=!1}return b.prototype=new a,b.prototype.dispatchLoadEvent=function(){this._loaded=!0,this.emit("loaded")},b.prototype.isLoaded=function(){return this._loaded},b.prototype.unLoad=function(){this._loaded=!1},b.prototype.sendMessage=function(a){this.emit("message",a)},b});