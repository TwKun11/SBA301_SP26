package org.kun.asmbe.service;

import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.CategoryDTO;
import org.kun.asmbe.entity.Category;
import org.kun.asmbe.exception.BadRequestException;
import org.kun.asmbe.exception.ResourceNotFoundException;
import org.kun.asmbe.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    
    private final CategoryRepository categoryRepository;
    
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<CategoryDTO> getActiveCategories() {
        return categoryRepository.findByIsActive(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return convertToDTO(category);
    }
    
    @Transactional(readOnly = true)
    public List<CategoryDTO> searchCategories(String keyword) {
        return categoryRepository.searchCategories(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }
    
    @Transactional
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        
        category.setCategoryName(categoryDTO.getCategoryName());
        category.setCategoryDescription(categoryDTO.getCategoryDescription());
        category.setParentCategoryId(categoryDTO.getParentCategoryId());
        category.setIsActive(categoryDTO.getIsActive());
        
        Category updatedCategory = categoryRepository.save(category);
        return convertToDTO(updatedCategory);
    }
    
    @Transactional
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        
        // Check if category has news articles
        if (categoryRepository.hasNewsArticles(id)) {
            throw new BadRequestException("Cannot delete category. Category has associated news articles.");
        }
        
        categoryRepository.delete(category);
    }
    
    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setCategoryDescription(category.getCategoryDescription());
        dto.setParentCategoryId(category.getParentCategoryId());
        dto.setIsActive(category.getIsActive());
        return dto;
    }
    
    private Category convertToEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setCategoryId(dto.getCategoryId());
        category.setCategoryName(dto.getCategoryName());
        category.setCategoryDescription(dto.getCategoryDescription());
        category.setParentCategoryId(dto.getParentCategoryId());
        category.setIsActive(dto.getIsActive());
        return category;
    }
}
