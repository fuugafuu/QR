document.getElementById('fileInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, img.width, img.height);

      if (code) {
        document.getElementById('result').innerHTML = `QRコードの内容: <a href="${code.data}" target="_blank">${code.data}</a>`;
        window.location.href = code.data;  // 自動でダウンロードリンクへ移動
      } else {
        document.getElementById('result').textContent = 'QRコードが認識できませんでした。';
      }
    };
  };
  reader.readAsDataURL(file);
});
