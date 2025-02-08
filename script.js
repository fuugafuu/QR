document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("ファイルを選択してください。");

  // ファイルをVercelやクラウドストレージにアップロードしてURLを取得する処理
  // ここではデモとしてダミーURLを使います。
  const dummyUrl = "https://example.com/shared/" + encodeURIComponent(file.name);

  // URLを表示
  document.getElementById('result').innerHTML = `共有URL: <a href="${dummyUrl}" target="_blank">${dummyUrl}</a>`;

  // QRコードを生成
  const qrCodeDiv = document.getElementById('qrcode');
  qrCodeDiv.innerHTML = ""; // 既存のQRコードをクリア
  QRCode.toCanvas(qrCodeDiv, dummyUrl, { width: 200 }, (error) => {
    if (error) console.error(error);
  });
});
