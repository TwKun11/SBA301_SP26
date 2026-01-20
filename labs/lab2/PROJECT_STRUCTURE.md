# Cấu trúc dự án ReactJS - Lab 2

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── CarouselBanner.jsx
│   ├── ConfirmModal.jsx
│   ├── FilterSort.jsx
│   ├── Footer.jsx
│   ├── Header.jsx       # Sử dụng useLogin hook
│   ├── ListOfOrchid.jsx
│   ├── ListOrchid.jsx
│   ├── MainLayout.jsx
│   ├── Orchid.jsx
│   ├── SearchBar.jsx
│   └── TestCount.jsx
│
├── pages/              # Các trang chính
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx       # Sử dụng useLogin hook
│   └── OrchidDetail.jsx
│
├── contexts/           # React Context API
│   └── AuthContext.jsx     # Context + Provider (All-in-one)
│
├── hooks/              # Custom React hooks
│   └── useLogin.js     # Hook để truy cập AuthContext (alias: useAuth)
│
├── store/              # State management (Reducers)
│   └── login/
│       └── loginReducer.jsx  # Reducer logic và actions
│
├── data/               # Dữ liệu tĩnh
│   ├── banners.js
│   ├── ListOfOrchid.js
│   └── listOrchids.js
│
├── assets/             # Hình ảnh, fonts, icons
│
├── App.jsx             # Component gốc
├── main.jsx            # Entry point với LoginProvider
└── index.css           # Global styles
```

## 🔑 Hệ thống Login với useReducer & useContext

### 1. **LoginReducer** (`store/login/loginReducer.jsx`)

- Quản lý state của form login
- Các action types: SET_USERNAME, SET_PASSWORD, SET_ERROR, SET_VALIDATED, RESET_FORM
- Pure reducer function xử lý state updates

### 2. **LoginContext** (`contexts/LoginContext.jsx`)

- Tạo Context để chia sẻ state login toàn ứng dụng
- Kết hợp useReducer với Context API
- Provider component bao bọc toàn bộ app
- Quản lý authentication state (isLoggedIn, username)
- Tích hợp localStorage để persist session
- Cung cấp các methods: login(), logout(), resetForm()

### 3. **useLogin Hook** (`hooks/useLogin.js`)

- Custom hook để truy cập LoginContext dễ dàng
- Đảm bảo hook chỉ được dùng trong LoginProvider
- Trả về tất cả state và methods từ context

## 🚀 Cách sử dụng

### 1. Setup Provider trong main.jsx

```jsx
import { LoginProvider } from "./contexts/LoginProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginProvider>
      <App />
    </LoginProvider>
  </BrowserRouter>,
);
```

### 2. Sử dụng Hook trong Component

```jsx
import { useLogin } from "../hooks/useLogin";

function MyComponent() {
  const {
    isLoggedIn, // Boolean - trạng thái đăng nhập
    username, // String - tên người dùng
    login, // Function - đăng nhập
    logout, // Function - đăng xuất
  } = useLogin();

  // Kiểm tra trạng thái đăng nhập
  if (isLoggedIn) {
    return <h1>Welcome, {username}!</h1>;
  }
}
```

### 3. Trang Login đầy đủ

```jsx
import { useLogin } from "../hooks/useLogin";

function Login() {
  const {
    formUsername, // State: username trong form
    password, // State: password trong form
    error, // State: thông báo lỗi
    validated, // State: trạng thái validation
    login, // Action: đăng nhập
    resetForm, // Action: reset form
    setUsername, // Action: set username
    setPassword, // Action: set password
    setValidated, // Action: set validated
  } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form
    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    // Thực hiện login
    const result = login(formUsername, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={formUsername} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### 4. Header với Logout

```jsx
import { useLogin } from "../hooks/useLogin";

function Header() {
  const { isLoggedIn, username, logout } = useLogin();

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <span>Welcome, {username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
```

## 📝 Thông tin đăng nhập mặc định

- **Username:** admin
- **Password:** 123456

## ✨ Tính năng

- ✅ Form validation với Bootstrap
- ✅ Error handling
- ✅ Session persistence với localStorage
- ✅ Global state management với Context API
- ✅ Predictable state updates với useReducer
- ✅ Protected routes
- ✅ Auto logout/login sync

## 🎯 Best Practices được áp dụng

### 1. Separation of Concerns (Tách biệt quan tâm)

- **UI Layer**: Components chỉ quan tâm hiển thị
- **Logic Layer**: Reducer xử lý business logic
- **State Layer**: Context quản lý global state
- **Hook Layer**: Custom hooks đóng gói logic tái sử dụng

### 2. Single Responsibility Principle

- Mỗi file có một trách nhiệm rõ ràng
- LoginContext: Chỉ định nghĩa context
- LoginProvider: Chỉ quản lý provider logic
- loginReducer: Chỉ xử lý state updates
- useLogin: Chỉ cung cấp interface truy cập context

### 3. Reusability (Tái sử dụng)

- Custom hook `useLogin()` có thể dùng ở bất kỳ component nào
- Reducer logic có thể test độc lập
- Context có thể mở rộng thêm tính năng

### 4. Type Safety & Predictability

- Action types được định nghĩa rõ ràng trong `LOGIN_ACTIONS`
- Không có "magic strings" trong code
- Dễ refactor và maintain

### 5. Immutability (Bất biến)

- State updates luôn immutable trong reducer
- Sử dụng spread operator `{...state}` để tạo object mới
- Đảm bảo React re-render chính xác

### 6. Single Source of Truth

- Context cung cấp một nguồn dữ liệu duy nhất
- Không có duplicate state
- State được sync tự động giữa các components

### 7. Error Handling

- Kiểm tra hook được dùng đúng context
- Validation form trước khi submit
- Error messages rõ ràng cho người dùng

### 8. Performance Optimization

- useReducer giảm số lần re-render
- Context chỉ trigger re-render khi cần thiết
- localStorage persist state giữa các sessions
