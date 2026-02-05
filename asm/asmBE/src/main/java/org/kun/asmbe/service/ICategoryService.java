package org.kun.asmbe.service;

import org.kun.asmbe.dto.CategoryDTO;

import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getAllCategories();
    List<CategoryDTO> getActiveCategories();
    CategoryDTO getCategoryById(Integer id);
    List<CategoryDTO> searchCategories(String keyword);
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO);
    void deleteCategory(Integer id);
}
