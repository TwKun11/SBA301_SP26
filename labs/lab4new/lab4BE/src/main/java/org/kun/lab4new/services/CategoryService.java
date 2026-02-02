package org.kun.lab4new.services;

import org.kun.lab4new.exceptions.ResourceNotFoundException;
import org.kun.lab4new.pojos.Category;
import org.kun.lab4new.repositories.ICategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {

    private ICategoryRepository iCategoryRepository;

    public CategoryService(ICategoryRepository iCategoryRepository) {
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return iCategoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(int categoryId) {
        Optional<Category> category = iCategoryRepository.findById(categoryId);
        if (category.isEmpty()) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        return category;
    }

    @Override
    public Category insertCategory(Category category) {
        return iCategoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int categoryId, Category category) {
        Category updateCategory = iCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        updateCategory.setCategoryName(category.getCategoryName());
        return iCategoryRepository.save(updateCategory);
    }

    @Override
    public void deleteCategory(int categoryId) {
        if (!iCategoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        iCategoryRepository.deleteById(categoryId);
    }
}
