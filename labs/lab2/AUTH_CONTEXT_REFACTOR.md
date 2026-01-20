# ✅ Cấu trúc mới: AuthContext (All-in-One)

## 📝 Thay đổi

### ❌ Trước (2 files riêng biệt)

```
src/contexts/
├── LoginContext.jsx    (chỉ export context)
└── LoginProvider.jsx   (provider component)
```

### ✅ Sau (1 file duy nhất)

```
src/contexts/
└── AuthContext.jsx     (context + provider)
```

---

## 📁 File Structure

### `src/contexts/AuthContext.jsx`

**All-in-one file chứa:**

1. **AuthContext** - Context object

```jsx
export const AuthContext = createContext();
```

2. **authReducer** - Reducer function

```jsx
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": ...
    case "LOGOUT": ...
    case "RESTORE_SESSION": ...
    default: return loginReducer(state, action);
  }
};
```

3. **AuthProvider** - Provider component

```jsx
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Methods: login, logout, setUsername, setPassword, etc.

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

## 🔧 Hook Usage

### `src/hooks/useLogin.js`

Export cả 2 hooks cho flexibility:

```jsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Alias cho backwards compatibility
export const useLogin = useAuth;
```

**Usage trong component:**

```jsx
// Cách 1: Dùng useAuth (khuyến nghị)
import { useAuth } from "../hooks/useLogin";
const { isLoggedIn, username, login, logout } = useAuth();

// Cách 2: Dùng useLogin (backwards compatible)
import { useLogin } from "../hooks/useLogin";
const { isLoggedIn, username, login, logout } = useLogin();
```

---

## 🚀 Setup trong main.jsx

```jsx
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
```

---

## 📊 Comparison

| Feature         | Old (2 files)                         | New (1 file)                |
| --------------- | ------------------------------------- | --------------------------- |
| Files           | LoginContext.jsx<br>LoginProvider.jsx | AuthContext.jsx             |
| Imports         | 2 imports needed                      | 1 import needed             |
| Exports         | Context & Provider separate           | Context & Provider together |
| Naming          | LoginContext/LoginProvider            | AuthContext/AuthProvider    |
| Maintainability | Split logic                           | All in one place            |

---

## ✨ Advantages

### 1. **Simpler Structure**

- ✅ 1 file thay vì 2 files
- ✅ Dễ tìm và maintain
- ✅ Giảm import statements

### 2. **Better Naming**

- ✅ `AuthContext` rõ ràng hơn `LoginContext`
- ✅ `AuthProvider` standard naming convention
- ✅ `useAuth` hook name standard

### 3. **Backwards Compatible**

- ✅ `useLogin` vẫn hoạt động (alias)
- ✅ Không cần sửa existing components ngay
- ✅ Migrate dần sang `useAuth`

### 4. **Easier to Understand**

- ✅ Tất cả auth logic ở 1 nơi
- ✅ Context và Provider cùng file
- ✅ Giảm cognitive load

---

## 🎯 Migration Guide

### Files Changed:

1. ✅ Created: `src/contexts/AuthContext.jsx`
2. ✅ Updated: `src/hooks/useLogin.js`
3. ✅ Updated: `src/main.jsx`
4. ✅ Deleted: `src/contexts/LoginContext.jsx`
5. ✅ Deleted: `src/contexts/LoginProvider.jsx`

### Components Updated:

- ✅ `main.jsx` - Import AuthProvider
- ✅ `useLogin.js` - Import AuthContext
- ✅ All components using useLogin still work (via alias)

### No Changes Needed:

- ✅ `Login.jsx` - Still uses useLogin
- ✅ `Header.jsx` - Still uses useLogin
- ✅ Other components

---

## 📚 API Reference

### AuthProvider Props

```jsx
<AuthProvider>{children}</AuthProvider>
```

### useAuth / useLogin Returns

```typescript
{
  // Auth State
  isLoggedIn: boolean;
  username: string;

  // Form State
  formUsername: string;
  password: string;
  error: string;
  validated: boolean;

  // Auth Actions
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;

  // Form Actions
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setValidated: (value: boolean) => void;
  setError: (message: string) => void;
  resetForm: () => void;

  // Direct dispatch (advanced)
  dispatch: Dispatch<Action>;
}
```

---

## 🔍 Testing

### Test Login Flow:

1. Go to `/login`
2. Enter: `admin` / `123456`
3. Should login successfully
4. Navigate to home
5. Should see "Xin chào, admin"
6. Click logout
7. Should logout and redirect

### Test Validation:

1. Go to `/login`
2. Enter wrong credentials
3. Should show error message
4. Form should NOT show green borders (validated)
5. Fix and login successfully
6. Now should work

---

## 📖 Related Files

- `src/store/login/loginReducer.jsx` - Pure reducer logic
- `src/contexts/AuthContext.jsx` - Context + Provider
- `src/hooks/useLogin.js` - Custom hook
- `src/pages/Login.jsx` - Login page
- `src/components/Header.jsx` - Auth status display

---

**Version:** 2.0.0  
**Updated:** 2026-01-20  
**Breaking Changes:** None (backwards compatible)
