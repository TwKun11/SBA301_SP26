package org.kun.lab4new.services;

import org.kun.lab4new.pojos.Category;
import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(int categoryId);
    Category insertCategory(Category category);
    Category updateCategory(int categoryId, Category category);
    void deleteCategory(int categoryId);
}
