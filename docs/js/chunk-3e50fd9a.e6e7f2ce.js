(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e50fd9a"],{"7f7f":function(e,t,n){var r=n("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,a="name";a in i||n("9e1e")&&r(i,a,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},8392:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._m(0),n("svg",{ref:"svg",staticClass:"container-border",staticStyle:{width:"80%",height:"80vh"},attrs:{viewBox:e.viewbox,version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[n("g",e._l(e.nodes,(function(t,r){return n("g",{key:r,attrs:{cx:t.x,cy:t.y,r:"5"}},[t.d?n("path",{attrs:{d:t.d,fill:"transparent",stroke:"#8e8e8e"}}):e._e(),n("circle",{attrs:{fill:"#9cc9b3","fill-opacity":"1",cx:t.x,cy:t.y,r:"12",stroke:"#9cc9b3","stroke-width":"2"}}),n("text",{staticStyle:{cursor:"pointer"},attrs:{x:t.x,y:t.y,fill:"#656565"},on:{click:function(n){return e.textClick(t)}}},[e._v(" "+e._s(t.name)+" ")])])})),0)])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Sample Static Tree")])])}],o=(n("c5f6"),n("7f7f"),{name:"node",data:function(){return{treeData:null,svgWidth:0,svgHeight:0,rootX:0,rootY:0,nodes:[]}},computed:{viewbox:function(){return"0 0 "+this.svgWidth+" "+this.svgHeight}},mounted:function(){var e=this,t=document.body.clientWidth,n=document.body.clientHeight;this.svgWidth=Math.floor(.6*t),this.svgHeight=n-72,this.treeData={name:"Top Level",children:[{name:"Level 2: A"},{name:"Level 2: B",children:[{name:"Level 3: A"},{name:"Level 3: B"}]},{name:"Level 2: C"}]},this.initTree(this.treeData),setTimeout((function(){e.nodes=[],e.treeData={name:"Top Level",children:[{name:"Level 2: C"}]},e.initTree(e.treeData)}),5e3)},methods:{initTree:function(e){this.rootX=Math.floor(.5*this.svgWidth),this.rootY=Math.floor(.4*this.svgHeight);var t=0,n=150,r=100,i={};i.name=e.name,i.value=e.value,i.x=this.rootX,i.y=this.rootY,i.pv=0,i.px=0,i.py=0,i.d=null,this.nodes.push(i);var o=this;function a(e,i,c){var l=e.length;t=o.svgWidth/c,t<200&&(t=200);for(var s=[],h=0,d=0;d<l;d++){var u={};u.name=e[d].name,u.value=e[d].value,u.x=l>1?d*t+.5*t:i.x,u.y=Number(i.y+n);var v="M"+i.x+" "+i.y+" C "+i.x+" "+Number(i.y+r)+", "+u.x+" "+Number(u.y-r)+", "+u.x+" "+u.y;if(u.d=v,o.nodes.push(u),e[d].children&&e[d].children.length>0){h+=e[d].children.length;var f={arr:e[d].children,node:u};s=s.concat(f)}}for(var g=0;g<s.length;g++)a(s[g].arr,s[g].node,h)}e.children&&e.children.length>0&&a(e.children,i,e.children.length)},textClick:function(e){console.log(e)}}}),a=o,c=n("2877"),l=Object(c["a"])(a,r,i,!1,null,"cd987ede",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-3e50fd9a.e6e7f2ce.js.map