# 📚 Tài liệu dự án Lab 2 - ReactJS Login System

## Mục lục

### 📖 Tài liệu chính

1. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**
   - Cấu trúc thư mục chi tiết
   - Giải thích từng phần của hệ thống
   - Kiến trúc tổng quan
   - Hướng dẫn sử dụng cơ bản
   - Best practices

2. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**
   - Tóm tắt những gì đã implement
   - Files đã tạo và cập nhật
   - Kiến trúc ASCII diagram
   - Data flow explanation
   - Code examples cho mọi use case

3. **[FLOW_DIAGRAM.md](FLOW_DIAGRAM.md)**
   - Sơ đồ luồng dữ liệu chi tiết
   - Component hierarchy
   - Login/Logout flow
   - Session persistence flow
   - File dependencies
   - Benefits visualization

4. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**
   - API reference nhanh
   - Ví dụ code thường gặp
   - Troubleshooting guide
   - Best practices
   - Common patterns

## 🎯 Bắt đầu nhanh

### Cài đặt & Chạy

```bash
# Cài đặt dependencies (nếu cần)
npm install

# Chạy development server
npm run dev
```

### Đăng nhập

- **Username:** `admin`
- **Password:** `123456`

### Sử dụng trong component

```jsx
import { useLogin } from "../hooks/useLogin";

function MyComponent() {
  const { isLoggedIn, username, login, logout } = useLogin();

  // Your code here
}
```

## 📁 Cấu trúc dự án mới

```
src/
├── contexts/          ⭐ MỚI - React Context
│   ├── LoginContext.jsx
│   └── LoginProvider.jsx
├── hooks/             ⭐ MỚI - Custom Hooks
│   └── useLogin.js
├── store/             📝 ĐÃ CÓ - Reducers
│   └── login/
│       └── loginReducer.jsx
├── components/        📝 Components
├── pages/            📝 Pages (Login updated)
├── data/             📝 Static data
├── assets/           📝 Media files
├── App.jsx           📝 Main app (updated)
└── main.jsx          📝 Entry point (updated)
```

## 🔑 Các tính năng chính

### 1. Global State Management

- ✅ `useReducer` cho predictable state updates
- ✅ `useContext` cho global state sharing
- ✅ Không có props drilling

### 2. Authentication

- ✅ Login/Logout functionality
- ✅ Session persistence với localStorage
- ✅ Protected routes support
- ✅ Auto session restore

### 3. Form Management

- ✅ Controlled inputs với reducer
- ✅ Form validation
- ✅ Error handling
- ✅ Reset functionality

### 4. Developer Experience

- ✅ Clean API với custom hook
- ✅ Type-safe actions
- ✅ Easy to test
- ✅ Well documented

## 🏗️ Kiến trúc

```
useReducer + useContext Pattern

LoginProvider (Provider)
    │
    ├── useReducer (State Management)
    │   └── loginReducer (Logic)
    │
    └── LoginContext.Provider (Distribution)
            │
            └── useLogin() hook (Access)
                    │
                    └── Components
```

## 📖 Đọc thêm

- **React Hooks:** [https://react.dev/reference/react](https://react.dev/reference/react)
- **useReducer:** [https://react.dev/reference/react/useReducer](https://react.dev/reference/react/useReducer)
- **useContext:** [https://react.dev/reference/react/useContext](https://react.dev/reference/react/useContext)
- **Context API:** [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

## 🛠️ Files quan trọng

| File                               | Chức năng               |
| ---------------------------------- | ----------------------- |
| `src/contexts/LoginContext.jsx`    | Định nghĩa Context      |
| `src/contexts/LoginProvider.jsx`   | Provider với useReducer |
| `src/hooks/useLogin.js`            | Custom hook             |
| `src/store/login/loginReducer.jsx` | Pure reducer            |
| `src/pages/Login.jsx`              | Login page              |
| `src/components/Header.jsx`        | Header với auth         |
| `src/main.jsx`                     | App entry với Provider  |

## 💡 Ví dụ nhanh

### Hiển thị thông tin user

```jsx
const { isLoggedIn, username } = useLogin();
return isLoggedIn ? <p>Hi, {username}</p> : <p>Guest</p>;
```

### Form login

```jsx
const { formUsername, password, setUsername, setPassword, login } = useLogin();
const handleSubmit = (e) => {
  e.preventDefault();
  login(formUsername, password);
};
```

### Logout button

```jsx
const { logout } = useLogin();
return <button onClick={logout}>Logout</button>;
```

## 🎓 Kiến thức áp dụng

- ✅ React Hooks (useState, useReducer, useContext, useEffect)
- ✅ Context API
- ✅ Reducer Pattern
- ✅ Custom Hooks
- ✅ Component Composition
- ✅ State Management
- ✅ Form Handling
- ✅ LocalStorage API
- ✅ React Router
- ✅ Bootstrap React

## ⚡ Performance

- Tối ưu re-renders với Context
- useReducer giảm state updates
- Immutable state updates
- Memoization ready

## 🔒 Security Notes

- Credentials được check ở client (demo purpose)
- Production nên validate ở server
- Dùng HTTPS cho production
- Implement proper authentication (JWT, OAuth, etc.)
- Hash passwords

## 📞 Support

Nếu gặp vấn đề:

1. Đọc [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Troubleshooting section
2. Check [FLOW_DIAGRAM.md](FLOW_DIAGRAM.md) - Hiểu flow
3. Xem [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Examples

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-20  
**React Version:** 18+  
**Pattern:** useReducer + useContext
