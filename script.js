document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("ファイルを選択してください。");

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.fileUrl) {
      document.getElementById('result').innerHTML = `共有URL: <a href="${result.fileUrl}" target="_blank">${result.fileUrl}</a>`;
      QRCode.toCanvas(document.getElementById('qrcode'), result.fileUrl, { width: 200 });
    } else {
      alert('アップロードに失敗しました。');
    }
  } catch (error) {
    console.error('エラー:', error);
    alert('エラーが発生しました。');
  }
});
