const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../../uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('File upload error:', err);  // エラーログ
      res.status(500).json({ error: 'ファイルのアップロードに失敗しました。' });
      return;
    }

    const uploadedFile = files.file;
    if (!uploadedFile) {
      console.error('No file received');  // エラーログ
      res.status(400).json({ error: 'ファイルが送信されていません。' });
      return;
    }

    const uniqueFileName = `${uuidv4()}-${uploadedFile.name}`;
    const newFilePath = path.join(form.uploadDir, uniqueFileName);

    fs.rename(uploadedFile.path, newFilePath, (err) => {
      if (err) {
        console.error('File rename error:', err);  // エラーログ
        res.status(500).json({ error: 'ファイルの保存に失敗しました。' });
        return;
      }

      const fileUrl = `https://your-vercel-app.vercel.app/uploads/${uniqueFileName}`;
      res.status(200).json({ fileUrl });
    });
  });
};
