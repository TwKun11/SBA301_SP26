# Lab4 - Orchid Management System với Category Mapping & Exception Handling

## Các tính năng đã thực hiện

### 1. ✅ Category Mapping với @ManyToOne Relationship

- **Backend:**
  - Tạo entity `Category` với @OneToMany relationship
  - Cập nhật entity `Orchid` với @ManyToOne mapping đến Category
  - Tạo CategoryRepository, CategoryService, CategoryController
  - API endpoints: `/categories` (GET, POST, PUT, DELETE)

- **Frontend:**
  - Thay thế text input bằng **Dropdown Select** cho Category
  - Tự động load danh sách categories từ API
  - Hiển thị category name trong bảng danh sách orchids

### 2. ✅ Global Exception Handling với @RestControllerAdvice

- **Backend:**
  - Tạo `ResourceNotFoundException` custom exception
  - Tạo `ErrorResponse` class cho cấu trúc JSON chuẩn
  - Tạo `GlobalExceptionHandler` với @RestControllerAdvice để bắt:
    - 404 Not Found (khi ID không tồn tại)
    - 400 Bad Request (validation errors)
    - 500 Internal Server Error (unexpected errors)
  - Cập nhật OrchidService & CategoryService để throw exceptions

- **Frontend:**
  - Đã có React-Toastify hiển thị thông báo CRUD
  - Cải thiện error handling với message từ backend

## Cấu trúc Database

### Bảng Category

```sql
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);
```

### Bảng Orchid (updated)

```sql
CREATE TABLE orchid (
    orchid_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_natural BIT,
    orchid_description TEXT,
    category_id INT NOT NULL,
    is_attractive BIT,
    orchid_url VARCHAR(500),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);
```

## Hướng dẫn chạy project

### 1. Chuẩn bị Database

```sql
-- Chạy file database_migration.sql để:
-- 1. Tạo bảng category
-- 2. Thêm dữ liệu mẫu (Vanda, Dendrobium, Phalaenopsis, etc.)
-- 3. Thêm cột category_id vào orchid table
-- 4. Xóa cột orchid_category cũ (nếu có)
```

### 2. Backend (Spring Boot)

```bash
cd lab4BE

# Build và chạy
mvnw spring-boot:run

# Hoặc với Maven đã cài
mvn spring-boot:run

# Backend sẽ chạy ở: http://localhost:8080
```

**API Endpoints:**

- `GET /orchids` - Lấy danh sách orchids
- `GET /orchids/{id}` - Lấy orchid theo ID
- `POST /orchids` - Thêm orchid mới
- `PUT /orchids/{id}` - Cập nhật orchid
- `DELETE /orchids/{id}` - Xóa orchid
- `GET /categories` - Lấy danh sách categories
- `POST /categories` - Thêm category mới

### 3. Frontend (React + Vite)

```bash
cd lab4FE

# Cài đặt dependencies (nếu chưa)
npm install

# Chạy dev server
npm run dev

# Frontend sẽ chạy ở: http://localhost:5173
```

### 4. Kiểm tra .env file

```
VITE_API_URL=http://localhost:8080/orchids
VITE_CATEGORY_API_URL=http://localhost:8080/categories
```

## Demo chức năng

### 1. Thêm Orchid mới với Category Dropdown

- Click "Add new orchid"
- Chọn category từ dropdown (không còn nhập text)
- Điền thông tin và Save
- Hệ thống sẽ hiển thị toast success/error

### 2. Edit Orchid

- Click Edit trên một orchid
- Category hiện tại sẽ được select sẵn
- Có thể đổi sang category khác
- Save để cập nhật

### 3. Exception Handling

**Test 404 Not Found:**

```bash
# Thử get orchid với ID không tồn tại
GET http://localhost:8080/orchids/999

Response:
{
  "timestamp": "2026-01-29T...",
  "status": 404,
  "error": "Not Found",
  "message": "Orchid not found with id: 999",
  "path": "/orchids/999"
}
```

**Test 400 Bad Request:**

```bash
# Thử thêm orchid với category ID không tồn tại
POST http://localhost:8080/orchids
{
  "name": "Test Orchid",
  "category": {"categoryId": 999},
  ...
}

Response:
{
  "timestamp": "2026-01-29T...",
  "status": 404,
  "error": "Not Found",
  "message": "Category not found with id: 999",
  "path": "/orchids"
}
```

## Các files quan trọng đã tạo/sửa

### Backend (lab4BE)

**Entities:**

- `pojos/Category.java` - Category entity với @OneToMany
- `pojos/Orchid.java` - Updated với @ManyToOne

**Repositories:**

- `repositories/ICategoryRepository.java`

**Services:**

- `services/ICategoryService.java`
- `services/CategoryService.java`
- `services/OrchidService.java` - Updated với exception handling

**Controllers:**

- `controllers/CategoryController.java`
- `controllers/OrchidController.java` - Existing

**Exception Handling:**

- `exceptions/ResourceNotFoundException.java`
- `exceptions/ErrorResponse.java`
- `exceptions/GlobalExceptionHandler.java` - @RestControllerAdvice

### Frontend (lab4FE)

**Components:**

- `components/ListOfOrchids.jsx` - Updated với category dropdown
- `components/EditOrchid.jsx` - Updated với category dropdown

**Config:**

- `.env` - Added VITE_CATEGORY_API_URL

## Dependencies cần thiết

### Backend (pom.xml)

```xml
<!-- JPA, Spring Web, SQL Server Driver -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
</dependency>
```

### Frontend (package.json)

```json
{
  "react-hook-form": "^7.x",
  "react-toastify": "^9.x",
  "axios": "^1.x",
  "react-bootstrap": "^2.x",
  "bootstrap-icons": "^1.x"
}
```

## Lưu ý quan trọng

1. **Database Migration:** Phải chạy `database_migration.sql` trước khi start backend
2. **Category data:** Đảm bảo có ít nhất 1 category trong database
3. **Foreign Key:** Không thể xóa category nếu có orchid đang sử dụng
4. **Backend first:** Phải start backend trước khi chạy frontend
5. **CORS:** Đã configure trong @CrossOrigin annotation

## Kiểm tra errors

### Trong Browser Console (F12):

- Network tab: Xem API calls và responses
- Console tab: Xem error logs

### Trong Backend Console:

- SQL queries (spring.jpa.show-sql=true)
- Exception stack traces
- Server errors

## Thành công! 🎉

Hệ thống đã có:

- ✅ Category mapping với @ManyToOne relationship
- ✅ Dropdown selection cho categories
- ✅ Global exception handling với JSON responses chuẩn
- ✅ Toast notifications cho tất cả CRUD operations
- ✅ Error messages chi tiết từ backend
