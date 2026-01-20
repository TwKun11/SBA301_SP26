# Tóm tắt: Cấu trúc lại ReactJS với useReducer & useContext

## ✅ Đã hoàn thành

### 1. Tái cấu trúc dự án

- ✅ Tạo thư mục `contexts/` - Quản lý React Context
- ✅ Tạo thư mục `hooks/` - Custom React hooks
- ✅ Tổ chức thư mục `store/` - State management với reducers
- ✅ Phân tách rõ ràng: components, pages, hooks, stores

### 2. Hệ thống Login hoàn chỉnh

#### Files đã tạo mới:

1. **`src/contexts/LoginContext.jsx`**
   - Định nghĩa LoginContext
   - Export context để sử dụng trong hooks

2. **`src/contexts/LoginProvider.jsx`**
   - Provider component sử dụng useReducer
   - Kết hợp authReducer và loginReducer
   - Quản lý localStorage để persist session
   - Cung cấp các methods: login, logout, setUsername, setPassword, etc.

3. **`src/hooks/useLogin.js`**
   - Custom hook để truy cập LoginContext
   - Error handling nếu dùng ngoài Provider
   - Interface đơn giản cho components

4. **`src/store/login/loginReducer.jsx`**
   - Pure reducer function
   - Định nghĩa LOGIN_ACTIONS
   - Quản lý form state: username, password, error, validated

#### Files đã cập nhật:

1. **`src/main.jsx`**
   - Wrap app với LoginProvider
   - Setup global state management

2. **`src/App.jsx`**
   - Loại bỏ local state cho authentication
   - Đơn giản hóa props passing

3. **`src/pages/Login.jsx`**
   - Sử dụng useLogin hook thay vì useState
   - Logic gọn gàng với custom hook
   - Form validation đầy đủ

4. **`src/components/Header.jsx`**
   - Sử dụng useLogin hook
   - Đồng bộ login state tự động
   - Không cần props drilling

## 📋 Kiến trúc

```
┌─────────────────────────────────────────────┐
│           main.jsx (Entry Point)            │
│  ┌───────────────────────────────────────┐  │
│  │        LoginProvider                  │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │    useReducer(authReducer)     │  │  │
│  │  │         ↓                       │  │  │
│  │  │    loginReducer (pure)         │  │  │
│  │  │         ↓                       │  │  │
│  │  │    LOGIN_ACTIONS               │  │  │
│  │  └─────────────────────────────────┘  │  │
│  │              ↓                         │  │
│  │    LoginContext.Provider              │  │
│  │    value: {state, actions}            │  │
│  └───────────────────────────────────────┘  │
│                  ↓                           │
│  ┌───────────────────────────────────────┐  │
│  │          App Component Tree           │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Login.jsx                      │  │  │
│  │  │    ↓ useLogin()                 │  │  │
│  │  │  Header.jsx                     │  │  │
│  │  │    ↓ useLogin()                 │  │  │
│  │  │  Other Components               │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
User Action (Login Form)
    ↓
setUsername() / setPassword() từ useLogin hook
    ↓
dispatch({ type: LOGIN_ACTIONS.SET_USERNAME, payload: value })
    ↓
authReducer → loginReducer
    ↓
Update state trong Context
    ↓
Re-render tất cả components subscribe LoginContext
    ↓
UI cập nhật tự động
```

## 📚 Cách sử dụng trong component

### Component cần authentication status

```jsx
import { useLogin } from "../hooks/useLogin";

function MyComponent() {
  const { isLoggedIn, username } = useLogin();

  return isLoggedIn ? <h1>Welcome {username}</h1> : <p>Please login</p>;
}
```

### Component cần login/logout actions

```jsx
import { useLogin } from "../hooks/useLogin";

function AuthButton() {
  const { isLoggedIn, logout } = useLogin();

  return isLoggedIn ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>;
}
```

### Form component

```jsx
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const { formUsername, password, error, setUsername, setPassword, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formUsername, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={formUsername} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

## 🎓 Best Practices áp dụng

### 1. Separation of Concerns

- Context chỉ cung cấp data
- Reducer chỉ xử lý logic
- Components chỉ render UI
- Hooks đóng gói logic tái sử dụng

### 2. Immutability

- Reducer luôn return new state
- Không mutate state trực tiếp
- Sử dụng spread operator

### 3. Type Safety

- Action types được define rõ ràng
- Không có magic strings
- Dễ maintain và refactor

### 4. Single Source of Truth

- State chỉ tồn tại ở một nơi (Context)
- Không duplicate state
- Auto sync giữa components

### 5. Error Handling

- Hook check context availability
- Form validation trước submit
- Clear error messages

### 6. Performance

- useReducer tối ưu re-renders
- Context chỉ update khi cần
- localStorage persist state

## 🔐 Credentials mặc định

- **Username:** admin
- **Password:** 123456

## 📦 Các tính năng

- ✅ Form validation với Bootstrap
- ✅ Error handling và hiển thị
- ✅ Session persistence với localStorage
- ✅ Global state management
- ✅ Clean code với custom hooks
- ✅ Auto login/logout sync
- ✅ Type-safe actions với constants

## 🎯 Lợi ích của kiến trúc này

1. **Scalability**: Dễ thêm features mới
2. **Maintainability**: Code rõ ràng, dễ maintain
3. **Testability**: Các phần có thể test riêng biệt
4. **Reusability**: Logic có thể tái sử dụng
5. **Performance**: Tối ưu re-renders
6. **Developer Experience**: API đơn giản, dễ sử dụng
