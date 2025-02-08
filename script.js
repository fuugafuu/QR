form.parse(req, (err, fields, files) => {
  if (err) {
    console.log("エラー発生:", err);  // ここでエラーを確認できる
    return res.status(500).json({ error: 'ファイルアップロードに失敗しました' });
  }
});
