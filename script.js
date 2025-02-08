document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('uploadForm');
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  const qrCodeImage = document.getElementById('qrCode');
  const downloadLink = document.getElementById('downloadLink');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // ページがリロードされないようにする

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('ファイルを選択してください');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // サーバーにファイルを送信して、アップロードURLを受け取る
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // サーバーからファイルのURLが返ってきたら、そのURLでQRコードを生成
      if (data.fileUrl) {
        const fileUrl = data.fileUrl;
        generateQRCode(fileUrl);
      }
    })
    .catch(error => {
      console.error('アップロードエラー:', error);
      alert('アップロードに失敗しました');
    });
  });

  // QRコードを生成する関数
  function generateQRCode(url) {
    const qrCode = new QRCode(qrCodeImage, {
      text: url,
      width: 128,
      height: 128
    });

    qrCodeContainer.style.display = 'block';
    qrCodeImage.style.display = 'block';
    downloadLink.href = qrCodeImage.src;  // ダウンロードリンクを設定
  }
});
