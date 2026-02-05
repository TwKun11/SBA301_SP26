package org.kun.asmbe.repository;

import org.kun.asmbe.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
    List<Category> findByIsActive(Boolean isActive);
    
    @Query("SELECT c FROM Category c WHERE " +
           "LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.categoryDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Category> searchCategories(@Param("keyword") String keyword);
    
    @Query("SELECT CASE WHEN COUNT(n) > 0 THEN true ELSE false END " +
           "FROM NewsArticle n WHERE n.categoryId = :categoryId")
    boolean hasNewsArticles(@Param("categoryId") Integer categoryId);
    
    List<Category> findByParentCategoryId(Integer parentCategoryId);
}
