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
      container.appendChild(img);

      img.onload = function() {
        const containerRect = container.getBoundingClientRect();
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

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

// Function to capture and save the image container
async function captureImageContainer() {
  try {
    // Import html2canvas dynamically
    const html2canvas = await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js'); //imports html2canvas API
    
    const canvas = await html2canvas.default(container, {
      allowTaint: true, //allows images from different sources
      useCORS: true, //allows images with different properties
      backgroundColor: '#ffffff'
    });
    
    return canvas.toDataURL('image/png'); //converts the uploaded picture into 64bit text something but (i think) specifies the text to be rendered as an image
  } catch (error) {
    console.error('Error capturing container:', error);
    return null;
  }
}

// Enhanced save function that includes the image container
async function saveEntry() {
  const content = entryBox.value.trim();
  const title = titleBox.value.trim();
  if (!content) return;

  // Capture the image container
  const containerImage = await captureImageContainer();

  const entry = {
    title,
    content,
    date: new Date().toLocaleString(),
    containerImage: containerImage // Save the captured image
  };

  let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.unshift(entry);
  localStorage.setItem('journalEntries', JSON.stringify(entries));

  entryBox.value = '';
  titleBox.value = '';
  container.innerHTML = ''; // Clear the container after saving
  loadEntries();
}

// Enhanced load function that displays saved container images
function loadEntries() {
  entriesSection.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    
    let imageHtml = '';
    if (entry.containerImage) {
      imageHtml = `<img src="${entry.containerImage}" alt="Saved image layout" style="max-width: 300px; height: auto; margin: 10px 0; border: 1px solid #ccc;">`;
    }
    
    div.innerHTML = `
      <strong>${entry.title || 'Untitled'}</strong><br>
      <small>${entry.date}</small><br><br>
      ${imageHtml}
      ${entry.content}
    `;
    entriesSection.appendChild(div);
  });
}

// Function to download the container as an image file
async function downloadContainer() {
  const containerImage = await captureImageContainer();
  if (containerImage) {
    const link = document.createElement('a');
    link.download = `travel-layout-${Date.now()}.png`;
    link.href = containerImage;
    link.click();
  }
}

// Load entries on page load
window.onload = loadEntries;