package org.kun.asmbe.repository;

import org.kun.asmbe.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    
    List<NewsArticle> findByNewsStatus(Boolean newsStatus);
    
    List<NewsArticle> findByCategoryId(Integer categoryId);
    
    List<NewsArticle> findByCreatedById(Integer createdById);
    
    List<NewsArticle> findByCreatedByIdAndNewsStatus(Integer createdById, Boolean newsStatus);
    
    @Query("SELECT n FROM NewsArticle n WHERE n.newsStatus = true AND " +
           "(LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(n.headline) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(n.newsContent) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<NewsArticle> searchActiveNews(@Param("keyword") String keyword);
    
    @Query("SELECT n FROM NewsArticle n WHERE " +
           "LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(n.headline) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(n.newsContent) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NewsArticle> searchAllNews(@Param("keyword") String keyword);
    
    @Query("SELECT n FROM NewsArticle n WHERE n.createdById = :accountId AND " +
           "(LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(n.headline) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<NewsArticle> searchNewsByCreator(@Param("accountId") Integer accountId, 
                                          @Param("keyword") String keyword);
}
