# Frontend Structure - Tối ưu hóa Code

## 📁 Cấu trúc thư mục mới

```
src/
├── components/          # React Components
│   ├── EditOrchid.jsx   # Refactored - Sử dụng hooks & shared components
│   ├── ListOfOrchids.jsx # Refactored - Sử dụng hooks & shared components
│   ├── NavBar.jsx        # Existing
│   ├── OrchidForm.jsx    # ✨ NEW - Reusable form component
│   └── OrchidTableRow.jsx # ✨ NEW - Reusable table row component
│
├── services/            # ✨ NEW - API Service Layer
│   ├── orchidService.js  # Orchid CRUD operations
│   ├── categoryService.js # Category CRUD operations
│   └── index.js          # Export all services
│
├── hooks/               # ✨ NEW - Custom React Hooks
│   ├── useOrchids.js     # Hook quản lý danh sách orchids
│   ├── useOrchidEdit.js  # Hook cho edit orchid
│   ├── useCategories.js  # Hook quản lý categories
│   └── index.js          # Export all hooks
│
├── utils/               # ✨ NEW - Utility Functions
│   ├── orchidUtils.js    # Helper functions cho orchid
│   └── index.js          # Export all utils
│
├── constants/           # ✨ NEW - Constants & Configuration
│   └── index.js          # API config, messages, defaults
│
├── App.jsx
└── main.jsx
```

## 🎯 Lợi ích của việc tối ưu

### 1. **Separation of Concerns**

- **Components**: Chỉ quản lý UI và user interactions
- **Services**: Xử lý tất cả API calls
- **Hooks**: Quản lý business logic và state
- **Utils**: Helper functions tái sử dụng
- **Constants**: Centralized configuration

### 2. **Code Reusability**

- `OrchidForm.jsx` dùng chung cho Add và Edit
- `OrchidTableRow.jsx` tái sử dụng cho mỗi row
- Custom hooks tái sử dụng logic giữa components
- Utils functions dùng ở nhiều nơi

### 3. **Easier Testing**

- Services có thể test độc lập
- Hooks có thể test với React Testing Library
- Utils functions dễ unit test

### 4. **Better Maintainability**

- Thay đổi API endpoint chỉ ở 1 nơi (constants)
- Sửa business logic chỉ ở hooks
- Cập nhật UI chỉ ở components

### 5. **Type Safety & Documentation**

- PropTypes cho components
- JSDoc comments cho functions
- Clear function signatures

## 📦 Chi tiết các files

### **Services Layer**

#### `orchidService.js`

```javascript
-getAllOrchids() - // GET all orchids
  getOrchidById(id) - // GET orchid by ID
  createOrchid(data) - // POST new orchid
  updateOrchid(id, data) - // PUT update orchid
  deleteOrchid(id); // DELETE orchid
```

#### `categoryService.js`

```javascript
-getAllCategories() - // GET all categories
  getCategoryById(id) - // GET category by ID
  createCategory(data) - // POST new category
  updateCategory(id, data) - // PUT update category
  deleteCategory(id); // DELETE category
```

### **Custom Hooks**

#### `useOrchids.js`

```javascript
const { orchids, loading, fetchOrchids, addOrchid, deleteOrchid } = useOrchids();
```

- Quản lý state orchids list
- Tự động fetch on mount
- Cung cấp CRUD operations với toast notifications

#### `useOrchidEdit.js`

```javascript
const { orchid, loading, fetchOrchid, updateOrchid } = useOrchidEdit(orchidId);
```

- Quản lý việc fetch & update single orchid
- Tự động format data cho form
- Handle navigation sau update

#### `useCategories.js`

```javascript
const { categories, loading, fetchCategories } = useCategories();
```

- Fetch và quản lý categories list
- Tự động load on mount

### **Utility Functions**

#### `orchidUtils.js`

```javascript
-getOrchidId(orchid) - // Get ID với fallback
  getOrchidImage(orchid) - // Get image với default
  transformOrchidData(formData) - // Transform cho API
  extractErrorMessage(error) - // Extract error từ response
  formatOrchidToForm(orchid); // Format API data cho form
```

### **Reusable Components**

#### `OrchidForm.jsx`

Dùng chung cho Add và Edit:

```jsx
<OrchidForm
  register={register}
  errors={errors}
  categories={categories}
  onSubmit={onSubmit}
  submitButtonText="Add/Update"
  isLoading={false}
/>
```

#### `OrchidTableRow.jsx`

Component cho mỗi row trong table:

```jsx
<OrchidTableRow orchid={orchid} onDelete={handleDelete} />
```

## 🔄 So sánh Before & After

### **Before (ListOfOrchids.jsx)**

```jsx
// ~200+ lines
- Trộn lẫn UI, logic, API calls
- Duplicate code với EditOrchid
- Khó test
- Hard-coded URLs
```

### **After (ListOfOrchids.jsx)**

```jsx
// ~70 lines
- Chỉ focus vào UI
- Sử dụng hooks cho logic
- Sử dụng shared components
- Clean và dễ đọc
```

## 🚀 Cách sử dụng

### Import services

```javascript
import orchidService from "../services/orchidService";
const orchids = await orchidService.getAllOrchids();
```

### Import hooks

```javascript
import { useOrchids, useCategories } from "../hooks";
const { orchids, addOrchid } = useOrchids();
```

### Import utils

```javascript
import { transformOrchidData } from "../utils/orchidUtils";
const data = transformOrchidData(formData);
```

### Import constants

```javascript
import { API_CONFIG, TOAST_MESSAGES } from "../constants";
```

## 📝 Best Practices được áp dụng

1. ✅ **Single Responsibility Principle** - Mỗi file có 1 nhiệm vụ
2. ✅ **DRY (Don't Repeat Yourself)** - Không duplicate code
3. ✅ **Separation of Concerns** - Tách rời logic layers
4. ✅ **Custom Hooks** - Tái sử dụng stateful logic
5. ✅ **PropTypes** - Type checking cho components
6. ✅ **Error Handling** - Centralized error extraction
7. ✅ **Loading States** - Show loading trong hooks
8. ✅ **Constants** - Centralized configuration
9. ✅ **JSDoc Comments** - Document functions
10. ✅ **Async/Await** - Modern promise handling

## 🎨 Styling & UI

Giữ nguyên:

- React Bootstrap components
- Bootstrap Icons
- React Toastify
- Existing CSS

## 🔧 Maintenance

### Thêm API endpoint mới

1. Thêm vào `constants/index.js`
2. Tạo service mới trong `services/`
3. Tạo hook nếu cần trong `hooks/`

### Thêm utility function

1. Thêm vào `utils/orchidUtils.js`
2. Export trong `utils/index.js`

### Thêm reusable component

1. Tạo file mới trong `components/`
2. Add PropTypes
3. Sử dụng trong parent components

## ✅ Migration Complete

Tất cả components đã được refactor để:

- Ngắn gọn và dễ đọc hơn
- Tái sử dụng code tốt hơn
- Dễ maintain và test hơn
- Follow React best practices
