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


console.log('rgheorih');
