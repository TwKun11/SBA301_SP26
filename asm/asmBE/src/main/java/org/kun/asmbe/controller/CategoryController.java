package org.kun.asmbe.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.CategoryDTO;
import org.kun.asmbe.service.CategoryService;
import org.kun.asmbe.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    
    private final ICategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<CategoryDTO>> getActiveCategories() {
        return ResponseEntity.ok(categoryService.getActiveCategories());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CategoryDTO>> searchCategories(@RequestParam String keyword) {
        return ResponseEntity.ok(categoryService.searchCategories(keyword));
    }
    
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Integer id, 
            @Valid @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
