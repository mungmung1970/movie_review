/* ================= 입력 요소 다크 테마 ================= */
input,
textarea {
  width: 100%;
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 10px 12px;
  color: #eee;
  font-size: 14px;
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: #777;
}

input:focus,
textarea:focus {
  border-color: #c9a24d;
  box-shadow: 0 0 0 1px rgba(201, 162, 77, 0.4);
}

/* ================= 버튼 ================= */
button {
  background: linear-gradient(135deg, #c9a24d, #a8842f);
  color: #111;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
