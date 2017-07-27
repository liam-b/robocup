'use strict';var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var COLOR={bold:'\x1B[1m',purple:'\x1B[35m',blue:'\x1B[34m',cyan:'\x1B[36m',green:'\x1B[32m',yellow:'\x1B[33m',red:'\x1B[31m',black:'\x1B[30m',end:'\x1B[0m'};module.exports=function(){function a(b){_classCallCheck(this,a),this.mainMethod=b,this.startTime=process.hrtime()}return _createClass(a,[{key:'log',value:function log(b,c,d,e,f){var g=this.getTimeStamp();void 0==f?console.log(''+COLOR.black+g.minutes+':'+g.seconds+':'+g.miliseconds+COLOR.end+' '+b+COLOR.bold+'['+c+']'+COLOR.end+' '+COLOR.purple+COLOR.bold+this.mainMethod+'/'+d+COLOR.end+' '+e):console.log(''+COLOR.black+g.minutes+':'+g.seconds+':'+g.miliseconds+COLOR.end+' '+b+COLOR.bold+'['+c+']'+COLOR.end+' '+COLOR.purple+COLOR.bold+this.mainMethod+'/'+d+COLOR.end+' '+COLOR.cyan+COLOR.bold+f+COLOR.end+' '+e)}},{key:'getTimeStamp',value:function getTimeStamp(){return{minutes:Math.floor(process.hrtime(this.startTime)[0]/60).toString(),seconds:(process.hrtime(this.startTime)[0]%60).toString(),miliseconds:process.hrtime(this.startTime)[1].toString().substring(0,2)}}},{key:'trace',value:function trace(b,c,d,e){this.log('','trace',b,c,d,e)}},{key:'info',value:function info(b,c,d,e){this.log(COLOR.blue,'info',b,c,d,e)}},{key:'debug',value:function debug(b,c,d,e){this.log(COLOR.green,'debug',b,c,d,e)}},{key:'warn',value:function warn(b,c,d,e){this.log(COLOR.yellow,'warn',b,c,d,e)}},{key:'error',value:function error(b,c,d,e){this.log(COLOR.red,'error',b,c,d,e)}},{key:'fatal',value:function fatal(b,c,d,e){this.log(COLOR.red,'fatal',b,c,d,e)}}]),a}();