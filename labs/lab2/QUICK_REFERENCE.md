# Quick Reference Guide - Login System

## 🚀 Khởi động nhanh

### 1. Import hook

```jsx
import { useLogin } from "../hooks/useLogin";
```

### 2. Sử dụng trong component

```jsx
const { isLoggedIn, username, login, logout } = useLogin();
```

## 📋 API Reference

### State Properties

| Property       | Type    | Description                |
| -------------- | ------- | -------------------------- |
| `isLoggedIn`   | Boolean | Trạng thái đăng nhập       |
| `username`     | String  | Tên user (sau khi login)   |
| `formUsername` | String  | Username trong form        |
| `password`     | String  | Password trong form        |
| `error`        | String  | Thông báo lỗi              |
| `validated`    | Boolean | Trạng thái validation form |

### Action Methods

| Method           | Parameters             | Return              | Description          |
| ---------------- | ---------------------- | ------------------- | -------------------- |
| `login()`        | `(username, password)` | `{success, error?}` | Thực hiện đăng nhập  |
| `logout()`       | None                   | `void`              | Đăng xuất            |
| `setUsername()`  | `(value)`              | `void`              | Set username field   |
| `setPassword()`  | `(value)`              | `void`              | Set password field   |
| `setValidated()` | `(boolean)`            | `void`              | Set validation state |
| `setError()`     | `(message)`            | `void`              | Set error message    |
| `resetForm()`    | None                   | `void`              | Reset toàn bộ form   |

## 💡 Ví dụ thường gặp

### Kiểm tra đăng nhập

```jsx
function ProtectedComponent() {
  const { isLoggedIn } = useLogin();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>Protected Content</div>;
}
```

### Hiển thị tên user

```jsx
function WelcomeMessage() {
  const { isLoggedIn, username } = useLogin();

  return <div>{isLoggedIn ? `Welcome, ${username}!` : "Please login"}</div>;
}
```

### Form đăng nhập đơn giản

```jsx
function SimpleLoginForm() {
  const { formUsername, password, error, setUsername, setPassword, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formUsername, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={formUsername} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Button đăng xuất

```jsx
function LogoutButton() {
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Navbar với auth status

```jsx
function Navbar() {
  const { isLoggedIn, username, logout } = useLogin();

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <span>Hi, {username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
```

### Protected Route

```jsx
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### Form với validation đầy đủ

```jsx
function FullLoginForm() {
  const navigate = useNavigate();
  const { formUsername, password, error, validated, login, resetForm, setUsername, setPassword, setValidated } =
    useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validate
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    // Login
    const result = login(formUsername, password);
    if (result.success) {
      navigate("/");
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/");
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={formUsername}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
        <Form.Control.Feedback type="invalid">Username phải có ít nhất 3 ký tự</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Form.Control.Feedback type="invalid">Password phải có ít nhất 6 ký tự</Form.Control.Feedback>
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button type="submit">Login</Button>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
}
```

## 🔧 Troubleshooting

### Error: "useLogin must be used within a LoginProvider"

**Nguyên nhân:** Component sử dụng `useLogin()` nhưng không nằm trong `<LoginProvider>`

**Giải pháp:** Đảm bảo App được wrap bởi LoginProvider trong `main.jsx`

```jsx
<LoginProvider>
  <App />
</LoginProvider>
```

### State không update

**Nguyên nhân:** Sử dụng sai action hoặc không dispatch

**Giải pháp:** Dùng methods từ `useLogin()`, không tự dispatch

```jsx
// ❌ Sai
dispatch({ type: "SET_USERNAME", payload: value });

// ✅ Đúng
setUsername(value);
```

### Session không persist

**Nguyên nhân:** localStorage bị disabled hoặc clear

**Giải pháp:** Kiểm tra browser settings, không dùng incognito mode

## 📝 Credentials mặc định

```
Username: admin
Password: 123456
```

## 🎯 Best Practices

### ✅ DO

- Luôn dùng `useLogin()` hook để truy cập state
- Check `isLoggedIn` trước khi hiển thị protected content
- Dùng provided methods thay vì dispatch trực tiếp
- Reset form sau khi cancel/success

### ❌ DON'T

- Không modify state trực tiếp
- Không tạo local copy của auth state
- Không hardcode credentials trong code
- Không skip validation

## 📚 Tài liệu liên quan

- `PROJECT_STRUCTURE.md` - Cấu trúc chi tiết dự án
- `IMPLEMENTATION_SUMMARY.md` - Tóm tắt implementation
- `FLOW_DIAGRAM.md` - Sơ đồ luồng dữ liệu
