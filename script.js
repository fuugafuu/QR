if (err) {
  console.error("エラーが発生しました:", err);  // どこでエラーが起きたかがわかる
  return res.status(500).json({ error: 'サーバーで問題が起きました' });
}
