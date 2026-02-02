package org.kun.lab4new.controllers;

import org.kun.lab4new.pojos.Category;
import org.kun.lab4new.services.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class CategoryController {

    private ICategoryService iCategoryService;

    public CategoryController(ICategoryService iCategoryService) {
        this.iCategoryService = iCategoryService;
    }

    @GetMapping("")
    public ResponseEntity<List<Category>> fetchAll() {
        return ResponseEntity.ok(iCategoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getCategoryByID(@PathVariable int id) {
        Optional<Category> category = iCategoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Category saveCategory(@RequestBody Category category) {
        return iCategoryService.insertCategory(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category category) {
        Category updatedCategory = iCategoryService.updateCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        iCategoryService.deleteCategory(id);
        return ResponseEntity.ok("Deleted!");
    }
}
