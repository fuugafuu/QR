const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// アップロードする場所を設定
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // 静的ファイルを提供

// ファイルアップロードのエンドポイント
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'ファイルが選択されていません' });
  }

  // アップロードされたファイルのURLを返す
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl: fileUrl });
});

// サーバーの起動
app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});
