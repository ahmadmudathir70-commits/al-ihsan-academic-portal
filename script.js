const state = { role: "student", tab: "overview" };
const announcements = [
  ["Mid-term examination timetable", "The draft timetable is available for students to review. Contact your class teacher if you notice an error.", "Today"],
  ["Science practical sessions", "Students should check their class notice for the scheduled laboratory groups.", "Yesterday"],
  ["Library reminder", "Please return borrowed books by the date recorded in your borrowing slip.", "Monday"]
];
const assignments = [
  ["Chemistry", "Mole concept: practice questions", "Due Friday", "Pending"],
  ["Mathematics", "Quadratic equations exercise", "Due Monday", "In progress"],
  ["Biology", "Short note on homeostasis", "Submitted", "Submitted"]
];
const materials = [
  ["Chemistry", "Introduction to the mole concept", "PDF · 12 pages"],
  ["Biology", "Homeostasis and excretion", "PDF · 9 pages"],
  ["Mathematics", "Quadratic equations revision", "Practice notes"],
  ["English", "Comprehension skills guide", "PDF · 6 pages"]
];
const timetable = [
  ["Monday", "Mathematics", "English", "Biology", "Chemistry"],
  ["Tuesday", "Physics", "Mathematics", "ICT", "English"],
  ["Wednesday", "Chemistry", "Biology", "Further Mathematics", "Civic Education"],
  ["Thursday", "English", "Physics", "Livestock Production", "Mathematics"],
  ["Friday", "Further Mathematics", "Chemistry", "Biology", "ICT"]
];

function studentOverview() {
 return `
 <div class="grid">
  <article class="card stat"><div class="stat-top">Assignments <span class="icon">▤</span></div><strong>2</strong><small>Require your attention</small></article>
  <article class="card stat"><div class="stat-top">Learning materials <span class="icon">▧</span></div><strong>12</strong><small>Available resources</small></article>
  <article class="card stat"><div class="stat-top">Attendance <span class="icon">✓</span></div><strong>94%</strong><small>Sample term attendance</small></article>
  <article class="card stat"><div class="stat-top">Upcoming tests <span class="icon">◷</span></div><strong>03</strong><small>In the next two weeks</small></article>
  <article class="card main-card">
   <div class="panel-title"><h2>Latest announcements</h2><button class="link-btn" data-go="announcements">View all →</button></div>
   <div class="list">${announcements.slice(0,3).map(a=>`<div class="row"><span class="dot"></span><div class="row-content"><strong>${a[0]}</strong><span>${a[1]}</span></div><time>${a[2]}</time></div>`).join("")}</div>
  </article>
  <article class="card side-card">
   <div class="panel-title"><h2>Quick access</h2></div>
   <div class="quick-grid">
    <button class="quick" data-go="materials"><i>▧</i><b>Study materials</b><span>Open resources</span></button>
    <button class="quick" data-go="assignments"><i>▤</i><b>Assignments</b><span>Check your work</span></button>
    <button class="quick" data-go="timetable"><i>▦</i><b>Timetable</b><span>View your week</span></button>
    <button class="quick" data-action="suggestion"><i>✉</i><b>Suggestion box</b><span>Share feedback</span></button>
   </div>
   <div class="notice"><small>Portal update</small><p>Keep an eye on announcements for changes to lessons, assignments and school activities.</p></div>
  </article>
  <article class="card full-card">
   <div class="panel-title"><h2>Assignments to follow up</h2><button class="link-btn" data-go="assignments">Open assignments →</button></div>
   ${assignmentRows()}
  </article>
 </div>`;
}
function teacherOverview() {
 return `
 <div class="grid">
  <article class="card stat"><div class="stat-top">My classes <span class="icon">▦</span></div><strong>5</strong><small>Sample teaching groups</small></article>
  <article class="card stat"><div class="stat-top">Students <span class="icon">♙</span></div><strong>168</strong><small>Across assigned classes</small></article>
  <article class="card stat"><div class="stat-top">Attendance today <span class="icon">✓</span></div><strong>91%</strong><small>Sample class average</small></article>
  <article class="card stat"><div class="stat-top">Pending tasks <span class="icon">◷</span></div><strong>04</strong><small>Records needing attention</small></article>
  <article class="card main-card">
   <div class="panel-title"><h2>Teacher workspace</h2><span class="badge green">Demo account</span></div>
   <div class="quick-grid">
    <button class="quick" data-action="assignment"><i>＋</i><b>Publish assignment</b><span>Set task and due date</span></button>
    <button class="quick" data-action="material"><i>⇧</i><b>Add learning material</b><span>Share a class resource</span></button>
    <button class="quick" data-action="announcement"><i>◉</i><b>Post announcement</b><span>Notify your students</span></button>
    <button class="quick" data-action="attendance"><i>✓</i><b>Record attendance</b><span>Open class register</span></button>
   </div>
  </article>
  <article class="card side-card">
   <div class="panel-title"><h2>School notices</h2><button class="link-btn" data-go="announcements">View all →</button></div>
   <div class="list">${announcements.slice(0,2).map(a=>`<div class="row"><span class="dot"></span><div class="row-content"><strong>${a[0]}</strong><span>${a[1]}</span></div></div>`).join("")}</div>
  </article>
  <article class="card full-card">
   <div class="panel-title"><h2>Class overview</h2><button class="action" data-action="attendance">Record attendance</button></div>
   <div class="table-wrap"><table><thead><tr><th>Class</th><th>Subject</th><th>Students</th><th>Attendance status</th></tr></thead><tbody>
   <tr><td>SS2 A</td><td>Chemistry</td><td>36</td><td class="status">Ready to record</td></tr>
   <tr><td>SS2 B</td><td>Chemistry</td><td>34</td><td class="status">Ready to record</td></tr>
   <tr><td>SS1 A</td><td>Basic Chemistry</td><td>32</td><td class="status">Ready to record</td></tr>
   </tbody></table></div>
  </article>
 </div>`;
}
function assignmentRows() {
 return `<div class="table-wrap"><table><thead><tr><th>Subject</th><th>Task</th><th>Deadline / status</th><th>Progress</th></tr></thead><tbody>${assignments.map(a=>`<tr><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td><span class="badge ${a[3]==="Submitted"?"green":""}">${a[3]}</span></td></tr>`).join("")}</tbody></table></div>`;
}
function renderTab() {
 const content = document.getElementById("content");
 if(state.tab==="overview") { content.innerHTML = state.role==="student" ? studentOverview() : teacherOverview(); return; }
 if(state.tab==="materials") {
  content.innerHTML = `<div class="grid"><article class="card full-card"><div class="panel-title"><h2>Learning materials</h2>${state.role==="teacher"?'<button class="action" data-action="material">＋ Add material</button>':''}</div><div class="table-wrap"><table><thead><tr><th>Subject</th><th>Resource</th><th>Format</th><th>Access</th></tr></thead><tbody>${materials.map(m=>`<tr><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td><td><button class="link-btn" data-action="resource">Open resource →</button></td></tr>`).join("")}</tbody></table></div></article></div>`;
 } else if(state.tab==="assignments") {
  content.innerHTML = `<div class="grid"><article class="card full-card"><div class="panel-title"><h2>${state.role==="teacher"?"Assignments published":"My assignments"}</h2>${state.role==="teacher"?'<button class="action" data-action="assignment">＋ Publish assignment</button>':''}</div>${assignmentRows()}</article></div>`;
 } else if(state.tab==="timetable") {
  content.innerHTML = `<div class="grid"><article class="card full-card"><div class="panel-title"><h2>Weekly class timetable</h2><span class="badge blue">Sample timetable</span></div><div class="table-wrap"><table><thead><tr><th>Day</th><th>Period 1</th><th>Period 2</th><th>Period 3</th><th>Period 4</th></tr></thead><tbody>${timetable.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div></article></div>`;
 } else {
  content.innerHTML = `<div class="grid"><article class="card full-card"><div class="panel-title"><h2>School announcements</h2>${state.role==="teacher"?'<button class="action" data-action="announcement">＋ Post announcement</button>':''}</div><div class="list">${announcements.map(a=>`<div class="row"><span class="dot"></span><div class="row-content"><strong>${a[0]}</strong><span>${a[1]}</span></div><time>${a[2]}</time></div>`).join("")}</div></article></div>`;
 }
}
function render() {
 const teacher=state.role==="teacher";
 document.getElementById("roleLabel").textContent=teacher?"Teacher workspace":"Student workspace";
 document.getElementById("greeting").textContent=teacher?"Welcome, Teacher.":"Good afternoon, Abu Aswad.";
 document.getElementById("welcomeText").textContent=teacher?"Manage classroom activities and share academic updates.":"Your learning space, organised in one place.";
 document.getElementById("avatar").textContent=teacher?"TC":"AS";
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===state.tab));
 renderTab();
}
function openModal(type) {
 const modal=document.getElementById("modalBackdrop");
 const title=document.getElementById("modalTitle"), desc=document.getElementById("modalDescription"), fields=document.getElementById("modalFields");
 const configs={
  suggestion:["Submit a suggestion","Share an idea with the school. This demo does not send or store your message.",'<label>Your suggestion</label><textarea rows="4" placeholder="Write your suggestion..."></textarea>'],
  assignment:["Publish an assignment","Create a sample assignment for your class.",'<label>Subject</label><input placeholder="e.g. Chemistry"><label>Assignment title</label><input placeholder="Enter task title"><label>Due date</label><input type="date">'],
  material:["Add learning material","Add a resource to the sample learning library.",'<label>Subject</label><input placeholder="e.g. Biology"><label>Resource title</label><input placeholder="Enter resource title"><label>Resource description</label><textarea rows="3" placeholder="Brief description"></textarea>'],
  announcement:["Post an announcement","Prepare a notice for the school community.",'<label>Announcement title</label><input placeholder="Enter title"><label>Message</label><textarea rows="4" placeholder="Write announcement..."></textarea>'],
  attendance:["Record class attendance","Choose a class to open its sample attendance register.",'<label>Class</label><select><option>SS2 A</option><option>SS2 B</option><option>SS1 A</option></select><label>Date</label><input type="date">'],
  resource:["Learning resource","This prototype displays sample resource entries only. A real portal would securely host approved school materials.",'']
 };
 const c=configs[type]||configs.resource;
 title.textContent=c[0]; desc.textContent=c[1]; fields.innerHTML=c[2];
 document.getElementById("saveModal").style.display=type==="resource"?"none":"inline-block";
 modal.classList.add("show");
}
document.getElementById("roleSelect").addEventListener("change",e=>{state.role=e.target.value;state.tab="overview";render();});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{state.tab=b.dataset.tab;render();}));
document.addEventListener("click",e=>{
 const go=e.target.closest("[data-go]"); if(go){state.tab=go.dataset.go;render();return;}
 const act=e.target.closest("[data-action]"); if(act){openModal(act.dataset.action);return;}
});
document.getElementById("closeModal").addEventListener("click",()=>document.getElementById("modalBackdrop").classList.remove("show"));
document.getElementById("saveModal").addEventListener("click",()=>{
 document.getElementById("modalBackdrop").classList.remove("show");
 alert("Demo only: this action is not connected to a live school database.");
});
document.getElementById("modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")e.currentTarget.classList.remove("show");});
render();
