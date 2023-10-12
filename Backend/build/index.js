(()=>{"use strict";var e={341:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(860)),u=r(954),i=(0,o.default)();i.use(o.default.json());var a=(0,u.SummaryController)();i.use("/summaries",a),i.get("/",(function(e,t){t.send("Hello World! 2")})),i.listen(3e3,(function(){return console.log("Server started on port ".concat(3e3))}))},981:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getAllSummariesUC=void 0;var r=function(){function e(e){this.repository=e}return e.prototype.getAllSumaries=function(){return this.repository.getAll()},e}();t.getAllSummariesUC=r},605:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=r(738),o=function(){function e(e){this.repository=e}return e.prototype.cresateSummary=function(e){var t={id:this.repository.getNextID(),name:e},r=n.SummaryCreator.createSummary(t);return this.repository.create(r),r},e}();t.default=o},600:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteSummaryUC=void 0;var r=function(){function e(e){this.repository=e}return e.prototype.deleteSummary=function(e){return this.repository.delete(e)},e}();t.deleteSummaryUC=r},962:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSummaryByIdUC=void 0;var r=function(){function e(e){this.repository=e}return e.prototype.getSummaryById=function(e){return this.repository.getOne(e)},e}();t.getSummaryByIdUC=r},310:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UpdateSummaryUC=void 0;var r=function(){function e(e){this.repository=e}return e.prototype.updateSummary=function(e,t){return this.repository.update(e,t)},e}();t.UpdateSummaryUC=r},991:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Summary=void 0;t.Summary=function(e){this.name=e.name,this.id=e.id}},738:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SummaryCreator=void 0;var n=r(991),o=function(){function e(){}return e.createSummary=function(e){return new n.Summary(e)},e}();t.SummaryCreator=o},287:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this.summaries=[{id:1,name:"Sumary 1"},{id:2,name:"Sumary 2"}],this.idCounter=1}return e.prototype.getNextID=function(){return this.idCounter++},e.prototype.getAll=function(){return this.summaries},e.prototype.create=function(e){this.summaries.push(e)},e.prototype.getOne=function(e){return this.summaries.find((function(t){return t.id===e}))},e.prototype.delete=function(e){var t=this.summaries.findIndex((function(t){return t.id===e}));return this.summaries.splice(t,1),t},e.prototype.update=function(e,t){var r=this.summaries.findIndex((function(t){return t.id===e}));return-1!==r?(this.summaries[r].name=t,this.summaries[r]):r},e}();t.default=r},954:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SummaryController=void 0;var o=n(r(287)),u=n(r(860)),i=r(981),a=n(r(605)),s=r(962),m=r(600),d=r(310);t.SummaryController=function(){var e=new o.default,t=u.default.Router();return t.get("/",(function(t,r){var n=new i.getAllSummariesUC(e).getAllSumaries();r.json(n)})),t.get("/:id",(function(t,r){var n=parseInt(t.params.id),o=new s.getSummaryByIdUC(e).getSummaryById(n);o?r.json(o):r.status(404).json({message:"Elemento no encontrado"})})),t.post("/",(function(t,r){if("object"==typeof t.body&&"name"in t.body){var n=t.body.name,o=new a.default(e).cresateSummary(n);r.status(201).json(o)}else r.status(400).json({error:"El cuerpo de la solicitud no es válido"})})),t.delete("/:id",(function(t,r){var n=parseInt(t.params.id);-1!==new m.deleteSummaryUC(e).deleteSummary(n)?r.send("Elemento borrado correctamente"):r.status(404).json({message:"Elemento no encontrado"})})),t.post("/:id",(function(t,r){var n=parseInt(t.params.id),o=t.body.name,u=new d.UpdateSummaryUC(e).updateSummary(n,o);-1!==u?r.send("Elemento actualizado correctamente: "+JSON.stringify(u)):r.status(404).json({message:"Elemento no encontrado"})})),t}},860:e=>{e.exports=require("express")}},t={};!function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}(341)})();