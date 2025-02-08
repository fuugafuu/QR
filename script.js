document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // フォームが送信されたときにページがリロードされるのを防ぎます

  // アップロードされたファイルを取得
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    return alert("ファイルを選択してください。"); // ファイルが選択されていなければ警告を出す
  }

  // フォームデータを作成
  const formData = new FormData();
  formData.append('file', file); // ファイルをフォームデータに追加

  try {
    // サーバーにファイルを送信
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    // サーバーからのレスポンスをJSONとして解析
    const result = await response.json();

    if (result.fileUrl) {
      // サーバーがファイルのURLを返した場合、そのURLを表示
      document.getElementById('result').innerHTML = `共有URL: <a href="${result.fileUrl}" target="_blank">${result.fileUrl}</a>`;

      // QRコードを生成して表示
      QRCode.toCanvas(document.getElementById('qrcode'), result.fileUrl, { width: 200 });
    } else {
      // サーバーが失敗した場合のエラーメッセージ
      alert('アップロードに失敗しました。');
    }
  } catch (error) {
    // ネットワークエラーなどが発生した場合のエラーハンドリング
    console.error('エラー:', error);
    alert('エラーが発生しました。');
  }
});
