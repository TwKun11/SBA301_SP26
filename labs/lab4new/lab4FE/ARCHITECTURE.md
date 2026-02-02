# Code Architecture Visualization

## 📊 Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │ ListOfOrchids    │              │  EditOrchid      │         │
│  │   Component      │              │   Component      │         │
│  └────────┬─────────┘              └────────┬─────────┘         │
│           │                                  │                   │
│           └──────────────┬───────────────────┘                   │
│                          │                                       │
│  ┌───────────────────────▼────────────────────────────┐         │
│  │         Shared Components Layer                     │         │
│  │  ┌────────────────┐    ┌──────────────────┐       │         │
│  │  │  OrchidForm    │    │ OrchidTableRow   │       │         │
│  │  └────────────────┘    └──────────────────┘       │         │
│  └────────────────────────────────────────────────────┘         │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                    Custom Hooks Layer                             │
├───────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐          │
│  │ useOrchids │  │useOrchidEdit │  │ useCategories   │          │
│  └──────┬─────┘  └──────┬───────┘  └────────┬────────┘          │
│         │               │                    │                   │
│         └───────────────┼────────────────────┘                   │
│                         │                                        │
└─────────────────────────┼────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                  Services Layer (API)                             │
├───────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐           ┌──────────────────┐            │
│  │ orchidService    │           │ categoryService  │            │
│  │ ▪ getAllOrchids  │           │ ▪ getAll         │            │
│  │ ▪ getById        │           │ ▪ getById        │            │
│  │ ▪ create         │           │ ▪ create         │            │
│  │ ▪ update         │           │ ▪ update         │            │
│  │ ▪ delete         │           │ ▪ delete         │            │
│  └────────┬─────────┘           └────────┬─────────┘            │
│           │                              │                       │
│           └──────────────┬───────────────┘                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│              Utilities & Constants Layer                          │
├───────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐              ┌───────────────┐             │
│  │ orchidUtils     │              │  constants    │             │
│  │ ▪ getOrchidId   │              │ ▪ API_CONFIG  │             │
│  │ ▪ getImage      │              │ ▪ MESSAGES    │             │
│  │ ▪ transform     │              │ ▪ DEFAULTS    │             │
│  │ ▪ extractError  │              └───────────────┘             │
│  └─────────────────┘                                             │
└───────────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Backend REST API     │
              │  /orchids, /categories │
              └────────────────────────┘
```

## 🔄 Data Flow

### **READ Flow (List Orchids)**

```
User Opens Page
    │
    ▼
ListOfOrchids Component
    │
    ├─► useOrchids() hook
    │       │
    │       ├─► orchidService.getAllOrchids()
    │       │       │
    │       │       ├─► axios.get(API_CONFIG.BASE_URL)
    │       │       │       │
    │       │       │       └─► Backend API
    │       │       │
    │       │       └─► Return orchids[]
    │       │
    │       └─► Update state & show toast
    │
    ├─► useCategories() hook
    │       │
    │       └─► categoryService.getAllCategories()
    │
    ▼
OrchidTableRow renders each orchid
```

### **CREATE Flow (Add Orchid)**

```
User clicks "Add new orchid"
    │
    ▼
Modal opens with OrchidForm
    │
    ▼
User fills form & submits
    │
    ▼
onSubmit handler
    │
    ├─► transformOrchidData(formData)
    │       │
    │       └─► Format: { ...data, category: { categoryId } }
    │
    ├─► useOrchids().addOrchid(data)
    │       │
    │       ├─► orchidService.createOrchid(data)
    │       │       │
    │       │       └─► axios.post(API_CONFIG.BASE_URL, data)
    │       │
    │       ├─► toast.success()
    │       │
    │       └─► fetchOrchids() to refresh list
    │
    └─► Close modal & reset form
```

### **UPDATE Flow (Edit Orchid)**

```
User clicks "Edit" on orchid
    │
    ▼
Navigate to /edit/:id
    │
    ▼
EditOrchid Component
    │
    ├─► useOrchidEdit(id) hook
    │       │
    │       ├─► fetchOrchid()
    │       │       │
    │       │       ├─► orchidService.getOrchidById(id)
    │       │       │
    │       │       ├─► formatOrchidToForm(orchid)
    │       │       │
    │       │       └─► setValue() for form fields
    │       │
    │       └─► On submit: updateOrchid(data)
    │               │
    │               ├─► orchidService.updateOrchid(id, data)
    │               │
    │               ├─► toast.success()
    │               │
    │               └─► navigate('/')
    │
    └─► useCategories() for dropdown
```

### **DELETE Flow**

```
User clicks "Delete" on orchid
    │
    ▼
Confirm dialog
    │
    ▼
handleDelete(id)
    │
    ▼
useOrchids().deleteOrchid(id)
    │
    ├─► orchidService.deleteOrchid(id)
    │       │
    │       └─► axios.delete(API_CONFIG.BASE_URL/${id})
    │
    ├─► toast.success()
    │
    └─► fetchOrchids() to refresh list
```

## 🎯 Code Organization Benefits

### **Before Refactoring**

```
components/
└── ListOfOrchids.jsx (220 lines)
    ├─ State management
    ├─ API calls inline
    ├─ Error handling
    ├─ Data transformation
    ├─ Form rendering
    └─ Table rendering

components/
└── EditOrchid.jsx (148 lines)
    ├─ State management  (DUPLICATE)
    ├─ API calls inline  (DUPLICATE)
    ├─ Error handling    (DUPLICATE)
    ├─ Data transformation (DUPLICATE)
    └─ Form rendering    (DUPLICATE)
```

### **After Refactoring**

```
components/
├── ListOfOrchids.jsx (101 lines)
│   └─ Only UI logic
├── EditOrchid.jsx (58 lines)
│   └─ Only UI logic
├── OrchidForm.jsx (shared)
└── OrchidTableRow.jsx (shared)

hooks/
├── useOrchids.js
├── useOrchidEdit.js
└── useCategories.js
    └─ Reusable business logic

services/
├── orchidService.js
└── categoryService.js
    └─ Single responsibility API layer

utils/
└── orchidUtils.js
    └─ Reusable transformations

constants/
└── index.js
    └─ Single source of truth
```

## 📊 Metrics Improvement

| Metric                 | Before | After     | Improvement |
| ---------------------- | ------ | --------- | ----------- |
| Total Component Lines  | 368    | 159       | **-57%**    |
| Code Duplication       | High   | None      | **100%**    |
| Testability            | Low    | High      | **↑↑↑**     |
| Maintainability        | Medium | High      | **↑↑**      |
| Reusability            | Low    | High      | **↑↑↑**     |
| Separation of Concerns | Poor   | Excellent | **↑↑↑**     |

## 🧩 Layer Responsibilities

| Layer          | Responsibility                    | Example                   |
| -------------- | --------------------------------- | ------------------------- |
| **Components** | UI rendering & user interactions  | JSX, event handlers       |
| **Hooks**      | Business logic & state management | useOrchids, useCategories |
| **Services**   | API communication                 | orchidService.create()    |
| **Utils**      | Data transformation & helpers     | transformOrchidData()     |
| **Constants**  | Configuration & static values     | API_CONFIG                |

## 🔐 Benefits Summary

✅ **Single Responsibility**: Each file has one clear purpose
✅ **DRY**: No code duplication
✅ **Testability**: Each layer can be tested independently
✅ **Maintainability**: Easy to find and fix bugs
✅ **Scalability**: Easy to add new features
✅ **Readability**: Clean and organized code
✅ **Reusability**: Shared components and hooks
✅ **Type Safety**: PropTypes validation
