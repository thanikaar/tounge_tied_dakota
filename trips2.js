const uploadInput = document.getElementById('upload');
const imgContainer = document.getElementById('img_container');

uploadInput.addEventListener('change', function () {
  imgContainer.innerHTML = ''; // clear previous images
  const files = uploadInput.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement('img');
      //const randomRotation = Math.random() * 360 - 180;
      img.src = e.target.result;
      img.style.maxWidth = '150px';
      img.style.margin = '10px';
      imgContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

