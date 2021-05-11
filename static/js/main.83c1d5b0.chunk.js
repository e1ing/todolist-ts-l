(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{60:function(e,t,a){e.exports=a(72)},65:function(e,t,a){},66:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),r=a.n(c),l=(a(65),a(41)),o=a(12),u=a(26),s=a(17),d=(a(66),a(116)),m=a(106),f=a(107);var b=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(!1),o=Object(s.a)(l,2),u=o[0],b=o[1],j=function(){var t=c.trim();t?e.addItem(t):b(!0),r("")};return i.a.createElement("div",null,i.a.createElement(d.a,{size:"small",variant:"outlined",error:u,helperText:u&&"Title is required",value:c,onChange:function(e){r(e.currentTarget.value),b(!1)},onKeyPress:function(e){"Enter"===e.key&&j()},label:"Title",onBlur:function(){return b(!1)}}),i.a.createElement(m.a,{color:"primary",onClick:j},i.a.createElement(f.a,null)))},j=a(102);function O(e){var t=Object(n.useState)(e.title),a=Object(s.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(!1),o=Object(s.a)(l,2),u=o[0],d=o[1];return u?i.a.createElement(j.a,{color:"primary",value:c,autoFocus:!0,onChange:function(e){r(e.currentTarget.value)},onBlur:function(){d(!1),e.changeTitle(c)}}):i.a.createElement("span",{onDoubleClick:function(){d(!0)}},e.title)}var v=a(118),E=a(109),h=a(108);var p=function(e){var t=e.tasks.map((function(t){return i.a.createElement("li",{key:t.id,className:t.isDone?"is-done":""},i.a.createElement(v.a,{color:"primary",onChange:function(a){return e.changeTaskStatus(t.id,a.currentTarget.checked,e.todoListID)},checked:t.isDone}),i.a.createElement(O,{title:t.title,changeTitle:function(a){return e.changeTaskTitle(t.id,a,e.todoListID)}}),i.a.createElement(m.a,{onClick:function(){e.removeTask(t.id,e.todoListID)}},i.a.createElement(h.a,null)))}));return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(O,{title:e.title,changeTitle:function(t){return e.changeTodoListTitle(t,e.todoListID)}}),i.a.createElement(m.a,{onClick:function(){return e.removeTodoList(e.todoListID)}},i.a.createElement(h.a,null))),i.a.createElement(b,{addItem:function(t){return e.addTask(t,e.todoListID)}}),i.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px"}},t),i.a.createElement("div",null,i.a.createElement(E.a,{color:"primary",size:"small",variant:"all"===e.filter?"contained":"outlined",onClick:function(){return e.changeFilter("all",e.todoListID)}},"All"),i.a.createElement(E.a,{style:{marginLeft:"3px"},color:"primary",size:"small",variant:"active"===e.filter?"contained":"outlined",onClick:function(){return e.changeFilter("active",e.todoListID)}},"Active"),i.a.createElement(E.a,{style:{marginLeft:"3px"},color:"primary",size:"small",variant:"completed"===e.filter?"contained":"outlined",onClick:function(){return e.changeFilter("completed",e.todoListID)}},"Completed")))},g=a(117),k=a(110),T=a(73),D=a(111),y=a(112),L=a(114),I=a(115),C=a(113);var S=function(){var e,t=Object(g.a)(),a=Object(g.a)(),c=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to buy",filter:"all"}]),r=Object(s.a)(c,2),d=r[0],f=r[1],j=Object(n.useState)((e={},Object(u.a)(e,t,[{id:Object(g.a)(),title:"HTML",isDone:!1},{id:Object(g.a)(),title:"CSS",isDone:!1},{id:Object(g.a)(),title:"React",isDone:!0}]),Object(u.a)(e,a,[{id:Object(g.a)(),title:"Milk",isDone:!0},{id:Object(g.a)(),title:"Meat",isDone:!0},{id:Object(g.a)(),title:"Bread",isDone:!1}]),e)),O=Object(s.a)(j,2),v=O[0],h=O[1],S=Object(n.useState)("all"),w=Object(s.a)(S,2);function x(e,t){v[t]=v[t].filter((function(t){return t.id!==e})),h(Object(o.a)({},v))}function B(e,t){var a={id:Object(g.a)(),title:e,isDone:!1};h(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},t,[a].concat(Object(l.a)(v[t])))))}function F(e,t,a){v[a]=v[a].map((function(a){return a.id===e?Object(o.a)(Object(o.a)({},a),{},{isDone:t}):a})),h(Object(o.a)({},v))}function z(e,t,a){v[a]=v[a].map((function(a){return a.id===e?Object(o.a)(Object(o.a)({},a),{},{title:t}):a})),h(Object(o.a)({},v))}function W(e,t){f(d.map((function(a){return a.id===t?Object(o.a)(Object(o.a)({},a),{},{filter:e}):a})))}function M(e){f(d.filter((function(t){return t.id!==e}))),delete v[e]}function A(e,t){f(d.map((function(a){return a.id===t?Object(o.a)(Object(o.a)({},a),{},{title:e}):a})))}function J(e){switch(e.filter){case"active":return v[e.id].filter((function(e){return!e.isDone}));case"completed":return v[e.id].filter((function(e){return e.isDone}));default:return v[e.id]}}w[0],w[1];var q=d.map((function(e){return i.a.createElement(k.a,{item:!0,key:e.id},i.a.createElement(T.a,{elevation:5,style:{padding:"20px"}},i.a.createElement(p,{todoListID:e.id,title:e.title,tasks:J(e),filter:e.filter,removeTask:x,changeFilter:W,addTask:B,changeTaskStatus:F,removeTodoList:M,changeTaskTitle:z,changeTodoListTitle:A})))}));return i.a.createElement("div",null,i.a.createElement(D.a,{position:"static"},i.a.createElement(y.a,{style:{justifyContent:"space-between"}},i.a.createElement(m.a,{color:"inherit"},i.a.createElement(C.a,null)),i.a.createElement(L.a,{variant:"h6"},"Todolists"),i.a.createElement(E.a,{variant:"outlined",color:"inherit"},"Login"))),i.a.createElement(I.a,{fixed:!0},i.a.createElement(k.a,{container:!0,style:{padding:"20px 0px"}},i.a.createElement(b,{addItem:function(e){var t=Object(g.a)(),a={id:t,title:e,filter:"all"};f([].concat(Object(l.a)(d),[a])),h(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},t,[])))}})),i.a.createElement(k.a,{container:!0,spacing:3},q)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[60,1,2]]]);
//# sourceMappingURL=main.83c1d5b0.chunk.js.map