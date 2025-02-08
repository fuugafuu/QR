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

    // サーバーから返されたレスポンスをtext()として一度取得
    const responseText = await response.text();
    console.log('サーバーからのレスポンス:', responseText);  // レスポンスが何か確認

    if (!response.ok) {
      alert('サーバーエラーが発生しました。');
      return;
    }

    // レスポンスがJSON形式でない場合にエラー
    try {
      const result = JSON.parse(responseText);  // ここでJSONに変換
      if (result.fileUrl) {
        document.getElementById('result').innerHTML = `共有URL: <a href="${result.fileUrl}" target="_blank">${result.fileUrl}</a>`;
        QRCode.toCanvas(document.getElementById('qrcode'), result.fileUrl, { width: 200 });
      } else {
        alert('アップロードに失敗しました。');
      }
    } catch (error) {
      console.error('JSONパースエラー:', error);
      alert('サーバーからのレスポンスが正しいJSON形式ではありません。');
    }

  } catch (error) {
    console.error('通信エラー:', error);
    alert('通信中にエラーが発生しました。');
  }
});
