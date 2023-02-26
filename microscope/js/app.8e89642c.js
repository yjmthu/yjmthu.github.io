(function(){"use strict";var e={1273:function(e,t,s){var i=s(9242),n=s(3396),o=s(7139);const a=(0,n._)("svg",{"aria-hidden":"true",fill:"none",stroke:"currentColor","stroke-width":"1.5",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[(0,n._)("path",{d:"M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75","stroke-linecap":"round","stroke-linejoin":"round"})],-1),r=[a];function c(e,t,s,i,a,c){const h=(0,n.up)("Demo"),l=(0,n.up)("Info");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n.Wm)(h),(0,n._)("aside",{class:(0,o.C_)(e.showAside)},[(0,n.Wm)(l),(0,n._)("div",{id:"side-bar-button",onClick:t[0]||(t[0]=(...t)=>e.toggleAside&&e.toggleAside(...t))},r)],2)])}var h=s(7327),l=s(6520);const d=e=>((0,n.dD)("data-v-69ebcd9a"),e=e(),(0,n.Cn)(),e),u={id:"three-body"},m=d((()=>(0,n._)("canvas",{id:"demoCanvas"},null,-1))),p={key:0,id:"animation-loading",class:"full-screen"},g={key:1,class:"full-screen"},f=d((()=>(0,n._)("h1",null,"加载失败，请检查网络。",-1))),v=[f];function b(e,t,s,a,r,c){const h=(0,n.up)("Loading");return(0,n.wg)(),(0,n.iD)("div",u,[m,0===e.status?((0,n.wg)(),(0,n.iD)("div",p,[(0,n.Wm)(h)])):(0,n.kq)("",!0),-1===e.status?((0,n.wg)(),(0,n.iD)("div",g,v)):(0,n.kq)("",!0),(0,n.wy)((0,n._)("div",{class:"tip"},(0,o.zw)(e.selectedObject),513),[[i.F8,e.selectedObject.length]])])}s(7658);var w=s(1114),P=s(9469),O=s(4543),k=s(2769),j=s(8421),y=s(2338),Z=s(840),x=s(9066),M=s(3292),C=s(5861);class W{constructor(){(0,h.Z)(this,"baseObjects",[null,null,null]),(0,h.Z)(this,"basePositions",[0,0,0]),(0,h.Z)(this,"groupX",new Array),(0,h.Z)(this,"groupY",new Array),(0,h.Z)(this,"groupZ",new Array)}}class Y{constructor(e,t){(0,h.Z)(this,"scene",null),(0,h.Z)(this,"camera",null),(0,h.Z)(this,"renderer",null),(0,h.Z)(this,"ambientLight",null),(0,h.Z)(this,"mesh",null),(0,h.Z)(this,"control",null),(0,h.Z)(this,"composer",null),(0,h.Z)(this,"outlinePass",null),(0,h.Z)(this,"envTexture",null),(0,h.Z)(this,"selectObject",void 0),(0,h.Z)(this,"updateStatus",void 0),(0,h.Z)(this,"microscope",new W),(0,h.Z)(this,"config",{environment:!0,background:!1,orbitControls:0,enableDamping:!0,scaleDelta:5}),(0,h.Z)(this,"gui",new M.XS),this.selectObject=e,this.updateStatus=t,this.init()}init(){this.scene=new w.xsS,this.setCamera(),this.setHdr(),this.setLight(),this.setRenderer(),this.setGltfModule(),this.outlineObj(),this.initGui(),this.animate(),this.initEventMap()}initGui(){this.scene&&(this.gui.add(this.config,"environment").onChange((e=>{this.scene.environment=e?this.envTexture:null})).name("环境光"),this.gui.add(this.config,"background").onChange((e=>{this.scene.background=e?this.envTexture:null})).name("背景图"),this.gui.add(this.config,"enableDamping").onChange((e=>{this.control&&(this.control.enableDamping=e)})).name("阻尼效果"),this.gui.add(this.config,"orbitControls",{"缩放":0,"滚动":1}).onChange((e=>{this.control&&(this.control.enableZoom=0==e)})).name("鼠标滚轮"),this.gui.add(this.config,"scaleDelta",.5,25,.5).name("缩放速度"))}initEventMap(){document.addEventListener("click",(e=>this.onPointerMove(e))),window.addEventListener("resize",(()=>this.onWindowResize())),document.addEventListener("wheel",(e=>this.onMouseScroll(e)),!1),document.addEventListener("keypress",(e=>{switch(e.key){case"z":case"Z":this.camera&&this.scene&&(this.camera.fov+=this.config.scaleDelta,this.camera.updateProjectionMatrix(),this.renderer?.render(this.scene,this.camera));break;case"x":case"X":this.camera&&this.scene&&(this.camera.fov-=this.config.scaleDelta,this.camera.updateProjectionMatrix(),this.renderer?.render(this.scene,this.camera));break}}))}setCamera(){this.camera=new w.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(-2,5,-5),this.camera.rotation.set(0,0,Math.PI)}setRenderer(){const e=document.getElementById("demoCanvas");this.renderer=new w.CP7({canvas:e,antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=w.ntZ,this.renderer.toneMapping=w.LY2,this.renderer.toneMappingExposure=1,this.renderer.outputEncoding=w.knz,this.camera&&(this.control=new O.z(this.camera,this.renderer.domElement),this.control.enableDamping=!0)}setHdr(){this.scene&&(new k.I).load("./static/brown_photostudio_02_4k.exr",(e=>{e.mapping=w.dSO,this.envTexture=e,this.scene.environment=e}))}setLight(){this.scene&&(this.ambientLight=new w.Mig(16777215),this.ambientLight.position.set(0,9,9),this.ambientLight.intensity=.2,this.scene.add(this.ambientLight),this.render())}setGltfModule(){if(this.scene){const e=(new P.E).setPath("./static/");e.load("test.gltf",(e=>{console.log("complete"),e.scene.traverse((e=>{if(e.isMesh)switch(e.castShadow=!0,e.receiveShadow=!0,e.name){case"载物台圆环":this.microscope.groupX.push(e),this.microscope.groupY.push(e);break;case"载物台Y":this.microscope.baseObjects[1]=e,this.microscope.basePositions[1]=e.getWorldPosition(e.position).z;break;case"手轮基座":case"手轮杆":case"纵动手轮":case"横动手轮":this.microscope.groupY.push(e);break;case"镜台":this.microscope.baseObjects[2]=e,this.microscope.basePositions[2]=e.getWorldPosition(e.position).y;break;case"调节螺钉":case"接受光镜头":case"接收光镜片":case"转换器":case"左目镜基座":case"右目镜基座":case"目镜分割条":case"双筒目镜组合":case"目镜台":case"目镜镜片":case"目镜套":case"目镜套环":case"目镜旋钮":this.microscope.groupZ.push(e);break;default:break}else e.isGroup&&"载物台X"===e.name&&(this.microscope.baseObjects[0]=e,this.microscope.basePositions[0]=e.getWorldPosition(e.position).x,this.microscope.groupY.push(e))})),this.scene.add(e.scene),this.render(),this.updateStatus(1)}),(e=>{console.log(e.loaded/e.total*100+"% loaded")}),(e=>{console.log("faile to load",e),this.updateStatus(-1)}))}}setCube(){if(this.scene){const e=new w.DvJ,t=new w.vBJ({color:16711680});this.mesh=new w.Kj0(e,t),this.scene.add(this.mesh),this.render()}}onPointerMove(e){if(this.scene&&this.camera&&this.outlinePass){const t=new w.FM8;t.x=e.clientX/window.innerWidth*2-1,t.y=-e.clientY/window.innerHeight*2+1;const s=new w.iMs;s.setFromCamera(t,this.camera);const i=s.intersectObjects(this.scene.children,!0);if(i&&i.length>0){const e=i[0].object;this.selectObject(e.name),this.outlinePass.selectedObjects[0]=e}else this.selectObject(""),this.outlinePass.selectedObjects=[]}}onWindowResize(){const e=window.innerWidth,t=window.innerHeight;this.camera&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix()),this.renderer?.setSize(e,t),this.composer?.setSize(e,t)}onMouseScroll(e){if(1==this.config.orbitControls&&this.outlinePass?.selectedObjects.length){const t=this.outlinePass.selectedObjects[0];switch(t.name){case"粗动调焦手轮":t.rotateOnWorldAxis(new w.Pa4(1,0,0),e.deltaY/(120*Math.PI)),this.moveZ(-e.deltaY/15e3);break;case"微动调焦手轮":t.rotateOnWorldAxis(new w.Pa4(1,0,0),e.deltaY/400),this.moveZ(-e.deltaY/15e4);break;case"转换器":t.rotateY((e.deltaY>0?-Math.PI:Math.PI)/3);break;case"纵动手轮":t.rotateOnWorldAxis(new w.Pa4(0,1,0),e.deltaY/400),this.moveY(-e.deltaY/15e3);break;case"横动手轮":t.rotateOnWorldAxis(new w.Pa4(0,1,0),e.deltaY/400),this.moveX(-e.deltaY/15e3);break;case"灯泡亮度旋钮":t.rotateOnWorldAxis(new w.Pa4(-1,0,0),e.deltaY/300);break;default:break}}}moveX(e){const t=this.microscope.baseObjects[0];if(!t)return;const s=t.getWorldPosition(t.position),i=s.x+e;if(i>-.1&&i<.059){s.x=i;for(const t of this.microscope.groupX){const s=t.getWorldPosition(t.position);s.x+=e}}}moveY(e){const t=this.microscope.baseObjects[1];if(!t)return;const s=t.getWorldPosition(t.position),i=s.z+e;if(i>-.587&&i<-.178){s.z=i;for(const t of this.microscope.groupY){const s=t.getWorldPosition(t.position);s.z+=e}}}moveZ(e){const t=this.microscope.baseObjects[2];if(!t)return;const s=t.getWorldPosition(t.position),i=s.y+e;if(i<.147&&i>-.233){s.y=i;for(const t of this.microscope.groupZ){const s=t.getWorldPosition(t.position);s.y+=e}}}render(){this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}outlineObj(){this.composer=new j.x(this.renderer);const e=new y.C(this.scene,this.camera);this.composer.addPass(e),this.outlinePass=new Z.f(new w.FM8(window.innerWidth,window.innerHeight),this.scene,this.camera),this.outlinePass.edgeStrength=5,this.outlinePass.edgeGlow=1,this.outlinePass.edgeThickness=1,this.outlinePass.pulsePeriod=5,this.outlinePass.visibleEdgeColor.set(16711680),this.outlinePass.renderToScreen=!0,this.composer.addPass(this.outlinePass);const t=new x.T(C.Y);this.composer.addPass(t)}animate(){this.control&&(this.control.update(),requestAnimationFrame(this.animate.bind(this)),this.render(),this.outlinePass?.selectedObjects.length&&this.composer?.render())}}const D={class:"loadingOne"};function A(e,t,s,i,a,r){return(0,n.wg)(),(0,n.iD)("div",D,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(5,(e=>(0,n._)("div",{key:e,style:(0,o.j5)({"animation-delay":.2*e+"s"})},null,4))),64))])}class _ extends l.w3{}var E=s(89);const S=(0,E.Z)(_,[["render",A]]);var z=S,L=function(e,t,s,i){var n,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(o<3?n(a):o>3?n(t,s,a):n(t,s))||a);return o>3&&a&&Object.defineProperty(t,s,a),a};let R=class extends l.w3{constructor(...e){super(...e),(0,h.Z)(this,"selectedObject",""),(0,h.Z)(this,"status",0)}mounted(){new Y((e=>{this.selectedObject=e}),(e=>{this.status=e}))}};R=L([(0,l.Ei)({components:{Loading:z}})],R);var H=R;const I=(0,E.Z)(H,[["render",b],["__scopeId","data-v-69ebcd9a"]]);var T=I;const X=(0,n.uE)("<h3 data-v-2e4ca29a>数字金相显微镜</h3><blockquote data-v-2e4ca29a><small data-v-2e4ca29a>基于 Vue3 和 Three.js 构建的金相显微镜实验平台。</small></blockquote><h4 data-v-2e4ca29a>使用方法</h4><ul data-v-2e4ca29a><li data-v-2e4ca29a>鼠标左键：旋转视角或选中物体</li><li data-v-2e4ca29a>鼠标滚轮：缩放视野或旋转旋钮</li><li data-v-2e4ca29a>鼠标右键：平移视野</li><li data-v-2e4ca29a><kbd data-v-2e4ca29a>X</kbd>键：放大</li><li data-v-2e4ca29a><kbd data-v-2e4ca29a>Z</kbd>键：缩小</li></ul><h4 data-v-2e4ca29a>提示</h4><p data-v-2e4ca29a>  Mozilla Firefox 渲染速度可能会稍慢，推荐使用 Microsoft Edge、Google Chrome 等 chromium 内核的浏览器。</p><nav data-v-2e4ca29a><small data-v-2e4ca29a>Copyright © 2023 清华大学. All rights reserved.</small></nav>",7),F=[X];function G(e,t,s,i,o,a){return(0,n.wg)(),(0,n.iD)("div",null,F)}class q extends l.w3{}const B=(0,E.Z)(q,[["render",G],["__scopeId","data-v-2e4ca29a"]]);var J=B,K=function(e,t,s,i){var n,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(o<3?n(a):o>3?n(t,s,a):n(t,s))||a);return o>3&&a&&Object.defineProperty(t,s,a),a};let V=class extends l.w3{constructor(...e){super(...e),(0,h.Z)(this,"showAside","animation-none")}toggleAside(){"animation-show-aside"!==this.showAside?this.showAside="animation-show-aside":this.showAside="animation-hide-aside"}};V=K([(0,l.Ei)({components:{Demo:T,Info:J}})],V);var N=V;const Q=(0,E.Z)(N,[["render",c]]);var U=Q;(0,i.ri)(U).mount("#app")}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,s),o.exports}s.m=e,function(){var e=[];s.O=function(t,i,n,o){if(!i){var a=1/0;for(l=0;l<e.length;l++){i=e[l][0],n=e[l][1],o=e[l][2];for(var r=!0,c=0;c<i.length;c++)(!1&o||a>=o)&&Object.keys(s.O).every((function(e){return s.O[e](i[c])}))?i.splice(c--,1):(r=!1,o<a&&(a=o));if(r){e.splice(l--,1);var h=n();void 0!==h&&(t=h)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[i,n,o]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,o,a=i[0],r=i[1],c=i[2],h=0;if(a.some((function(t){return 0!==e[t]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(c)var l=c(s)}for(t&&t(i);h<a.length;h++)o=a[h],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(l)},i=self["webpackChunkdemo"]=self["webpackChunkdemo"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(1273)}));i=s.O(i)})();
//# sourceMappingURL=app.8e89642c.js.map