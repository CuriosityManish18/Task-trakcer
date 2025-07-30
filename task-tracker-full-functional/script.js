// Shared logic for login and tracker
function startJourney() {
  const name = document.getElementById('name').value;
  const task = document.getElementById('task').value;
  const days = parseInt(document.getElementById('days').value);
  if (!name || !task || isNaN(days) || days < 1) { alert('Please fill in all fields correctly.'); return; }
  const today = new Date();
  localStorage.setItem('trackerName', name);
  localStorage.setItem('trackerTask', task);
  localStorage.setItem('trackerDays', days);
  localStorage.setItem('trackerStartDate', today.toISOString());
  window.location.href = 'tracker.html';
}

function showTracker() {
  const name = localStorage.getItem('trackerName');
  const task = localStorage.getItem('trackerTask');
  const days = parseInt(localStorage.getItem('trackerDays'));
  const start = new Date(localStorage.getItem('trackerStartDate'));
  const today = new Date(); today.setHours(0,0,0,0); start.setHours(0,0,0,0);
  const passed = Math.floor((today - start)/(1000*60*60*24));
  const remaining = Math.max(days - passed, 0);
  document.getElementById('title').textContent = `Hi ${name}, ${remaining} days left`;
  document.getElementById('subtitle').textContent = `to complete ${task}`;
  const grid = document.getElementById('grid'); grid.innerHTML = '';
  for (let i=0;i<days;i++){
    const d=document.createElement('div');
    if(i<passed) d.className='completed';
    grid.appendChild(d);
  }
}

function resetJourney() {
  localStorage.clear();
  window.location.href='login.html';
}

window.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  if(startBtn) startBtn.addEventListener('click', startJourney);
  const resetBtn = document.getElementById('reset-btn');
  if(resetBtn) resetBtn.addEventListener('click', resetJourney);
  if(location.pathname.endsWith('tracker.html')) showTracker();
});
