"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[772],{5772:(T,h,a)=>{a.r(h),a.d(h,{ContactModule:()=>u});var g=a(6895),d=a(6773),t=a(8256),C=a(529),f=a(2340);class s{constructor(e){this.httpClient=e}postMessage(e){return this.httpClient.post("api/messages",e,{headers:new C.WM({Authorization:f.N.API_KEY})})}static#t=this.\u0275fac=function(n){return new(n||s)(t.LFG(C.eN))};static#e=this.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}const _=["*"];class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-page-title"]],ngContentSelectors:_,decls:2,vars:0,consts:[[1,"page-title__wrapper"]],template:function(n,o){1&n&&(t.F$t(),t.TgZ(0,"span",0),t.Hsn(1),t.qZA())},styles:["[_nghost-%COMP%]{display:block}.page-title__wrapper[_ngcontent-%COMP%]{font-family:La Belle Aurore,cursive;font-size:1.8rem;display:block;text-align:center}"]})}var v=a(7674),y=a(3412),b=a(1195);class p{constructor(e){this.service=e,this.contactEmail=void 0,this.subject=void 0,this.message=void 0}onContactEmailChange(e){this.contactEmail=e}onSubjectChange(e){this.subject=e}onMessageChange(e){this.message=e}onSubmit(){console.log(this.contactEmail," : ",this.subject," : ",this.message),this.contactEmail&&this.subject&&this.message&&this.service.postMessage({contact_email:this.contactEmail,subject:this.subject,message:this.message}).subscribe({next:e=>{console.log(e)}})}static#t=this.\u0275fac=function(n){return new(n||p)(t.Y36(s))};static#e=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-contact"]],decls:9,vars:4,consts:[[1,"contact__page-wrapper"],[1,"contact__response-info"],[3,"label","valueChanged"],[3,"label","submit"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"app-page-title"),t._uU(2,"Contact"),t.qZA(),t.TgZ(3,"p",1),t._uU(4," I will try to respond within 2 working days, but if you don't hear from me, you can also contact me on social media. "),t.qZA(),t.TgZ(5,"app-text-input",2),t.NdJ("valueChanged",function(c){return o.onContactEmailChange(c)}),t.qZA(),t.TgZ(6,"app-text-input",2),t.NdJ("valueChanged",function(c){return o.onSubjectChange(c)}),t.qZA(),t.TgZ(7,"app-text-area",2),t.NdJ("valueChanged",function(c){return o.onMessageChange(c)}),t.qZA(),t.TgZ(8,"app-button",3),t.NdJ("submit",function(){return o.onSubmit()}),t.qZA()()),2&n&&(t.xp6(5),t.Q6J("label","Contact Email"),t.xp6(1),t.Q6J("label","Subject"),t.xp6(1),t.Q6J("label","Message"),t.xp6(1),t.Q6J("label","Submit"))},dependencies:[i,v.t,y.U,b.r],styles:[".contact__page-wrapper[_ngcontent-%COMP%]{padding:0 1rem 1rem;display:flex;flex-direction:column;height:100%}.contact__page-wrapper[_ngcontent-%COMP%]   .contact__response-info[_ngcontent-%COMP%]{margin:0}.contact__page-wrapper[_ngcontent-%COMP%]   app-text-area[_ngcontent-%COMP%]{flex:1 1 auto;margin-bottom:.5rem}@media screen and (max-height: 600px){.contact__page-wrapper[_ngcontent-%COMP%]{padding:1rem}app-page-title[_ngcontent-%COMP%]{display:none}}"]})}const x=[{path:"",component:p}];class r{static#t=this.\u0275fac=function(n){return new(n||r)};static#e=this.\u0275mod=t.oAB({type:r});static#n=this.\u0275inj=t.cJS({imports:[d.Bz.forChild(x),d.Bz]})}class l{static#t=this.\u0275fac=function(n){return new(n||l)};static#e=this.\u0275mod=t.oAB({type:l});static#n=this.\u0275inj=t.cJS({imports:[g.ez]})}var M=a(3936);class u{static#t=this.\u0275fac=function(n){return new(n||u)};static#e=this.\u0275mod=t.oAB({type:u});static#n=this.\u0275inj=t.cJS({imports:[g.ez,r,l,M.P]})}}}]);