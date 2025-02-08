document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('uploadForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();  // ページがリロードされないようにする

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('アップロード成功:', data);
    })
    .catch(error => {
      console.error('アップロードエラー:', error);
    });
  });
});
