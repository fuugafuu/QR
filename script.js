form.addEventListener('submit', function(event) {
  event.preventDefault();  // フォームが自動的に送信されないようにする
  
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
