-- Tạo bảng Category
CREATE TABLE IF NOT EXISTS category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);

-- Thêm dữ liệu mẫu cho Category
INSERT INTO category (category_name) VALUES 
('Vanda'),
('Dendrobium'),
('Phalaenopsis'),
('Cattleya'),
('Oncidium'),
('Paphiopedilum');

-- Thêm cột category_id vào bảng orchid (nếu chưa có)
-- Lưu ý: Drop cột orchid_category cũ nếu tồn tại
ALTER TABLE orchid 
ADD COLUMN category_id INT,
ADD CONSTRAINT fk_category 
FOREIGN KEY (category_id) REFERENCES category(category_id);

-- Nếu bạn có dữ liệu cũ trong orchid_category, bạn có thể map chúng:
-- UPDATE orchid SET category_id = 1 WHERE orchid_category = 'Vanda';
-- UPDATE orchid SET category_id = 2 WHERE orchid_category = 'Dendrobium';
-- UPDATE orchid SET category_id = 3 WHERE orchid_category = 'Phalaenopsis';
-- ... (tiếp tục cho các category khác)

-- Sau khi map xong, xóa cột cũ:
-- ALTER TABLE orchid DROP COLUMN orchid_category;
