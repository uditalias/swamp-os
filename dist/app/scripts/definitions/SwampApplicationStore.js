define(["EventEmitter"],function(a){function b(){this.super=a,this.super(),this._prompt=null,this._contextMenu=null}var c="change";return b.prototype=new a,b.prototype.setPrompt=function(a,b,c){this._prompt={text:a,onConfirm:b||function(){},onCancel:c||function(){},okBtnText:"OK",cancelBtnText:"Cancel"}},b.prototype.hasPrompt=function(){return!!this._prompt},b.prototype.getPrompt=function(){return this._prompt},b.prototype.confirmPrompt=function(){this._prompt&&this._prompt.onConfirm(),this.clearPrompt()},b.prototype.cancelPrompt=function(){this._prompt&&this._prompt.onCancel(),this.clearPrompt()},b.prototype.clearPrompt=function(){this._prompt=null},b.prototype.setContextMenu=function(a,b){this._contextMenu={items:a,position:b}},b.prototype.hasContextMenu=function(){return!!this._contextMenu},b.prototype.getContextMenu=function(){return this._contextMenu},b.prototype.clearContextMenu=function(){this._contextMenu=null},b.prototype.emitChange=function(){this.emitEvent(c)},b.prototype.addChangeListener=function(a){this.on(c,a)},b.prototype.removeChangeListener=function(a){this.off(c,a)},b});