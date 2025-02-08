const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    console.error("サポートされていないリクエストメソッドです");
    return res.status(405).json({ error: 'POSTリクエストを送ってください' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../../uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("ファイルのアップロードエラー:", err);
      return res.status(500).json({ error: 'ファイルのアップロードに失敗しました。' });
    }

    const uploadedFile = files.file;
    if (!uploadedFile) {
      console.error("ファイルが選択されていません");
      return res.status(400).json({ error: 'ファイルが送信されていません。' });
    }

    const uniqueFileName = `${uuidv4()}-${uploadedFile.name}`;
    const newFilePath = path.join(form.uploadDir, uniqueFileName);

    fs.rename(uploadedFile.path, newFilePath, (err) => {
      if (err) {
        console.error("ファイル保存エラー:", err);
        return res.status(500).json({ error: 'ファイルの保存に失敗しました。' });
      }

      const fileUrl = `https://your-vercel-app.vercel.app/uploads/${uniqueFileName}`;
      console.log("アップロード成功:", fileUrl);
      res.status(200).json({ fileUrl });
    });
  });
};
