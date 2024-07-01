useEffect(() => {
  fetchProducts();

  // Kiểm tra thông báo đăng nhập từ Session Storage
  const message = sessionStorage.getItem("loginSuccessMessage");
  if (message) {
    window.alert(message); // Hiển thị thông báo bằng alert
    sessionStorage.removeItem("loginSuccessMessage"); // Xóa thông báo sau khi hiển thị
  }
}, []);