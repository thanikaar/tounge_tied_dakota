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

      /* Random position within viewport
      const maxWidth = window.innerWidth - 150;
      const maxHeight = window.innerHeight/3 - 150;

      const randomLeft = Math.random() * maxWidth;
      const randomTop = Math.random() * maxHeight;
      const randomRotation = Math.random() * 360 - 180; // -180 to 180 deg

      img.style.left = `${randomLeft}px`;
      img.style.top = `${randomTop}px`;
      img.style.transform = `rotate(${randomRotation}deg)`;

      document.body.appendChild(img);*/
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

        container.appendChild(img); // <-- append to the parent, not body
      };
    };

    reader.readAsDataURL(file);
  });
});
