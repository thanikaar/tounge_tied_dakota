const uploadInput = document.getElementById('upload');
const container = document.getElementById('img_container');

uploadInput.addEventListener('change', function(event) {
  const files = event.target.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'random-img';
      container.appendChild(img); // <-- append to the parent, not body

      img.onload = function() {
        const containerRect = container.getBoundingClientRect();
        const imgWidth = img.width;
        const imgHeight = img.height;

        const maxLeft = container.clientWidth - imgWidth;
        const maxTop = container.clientHeight - imgHeight;

        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;
        const randomRotation = Math.random() * 360 - 180;

        img.style.left = `${randomLeft}px`;
        img.style.top = `${randomTop}px`;
        img.style.transform = `rotate(${randomRotation}deg)`;

      };
    };

    reader.readAsDataURL(file);
  });
});


const entryBox = document.getElementById('entry');
const titleBox = document.getElementById('title');
const entriesSection = document.getElementById('entries');


function saveEntry() {
  const content = entryBox.value.trim();
  const title = titleBox.value.trim();
  if (!content) return;

  const entry = {
    title,
    content,
    date: new Date().toLocaleString()
  };

  let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]'); //reads old saved json entries as arrays
  entries.unshift(entry); //pushes the most recent entry to the top
  localStorage.setItem('journalEntries', JSON.stringify(entries)); //converts new entry into json

  entryBox.value = '';
  titleBox.value = '';
  loadEntries();
}

function loadEntries() {
  entriesSection.innerHTML = ''; //clears whats currently displayed in the html
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]'); //loads the saved json entriesand converts it into string
  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<strong>${entry.title || 'Untitled'}</strong><br><small>${entry.date}</small><br><br>${entry.content}`;
    entriesSection.appendChild(div);
  });
}

// Load entries on page load
window.onload = loadEntries;
