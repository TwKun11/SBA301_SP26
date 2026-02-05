package org.kun.asmbe.repository;

import org.kun.asmbe.entity.NewsTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsTagRepository extends JpaRepository<NewsTag, NewsTag.NewsTagId> {
    
    @Query("SELECT nt FROM NewsTag nt WHERE nt.newsArticle.newsArticleId = :newsArticleId")
    List<NewsTag> findByNewsArticleId(@Param("newsArticleId") Integer newsArticleId);
    
    @Query("SELECT nt FROM NewsTag nt WHERE nt.tag.tagId = :tagId")
    List<NewsTag> findByTagId(@Param("tagId") Integer tagId);
    
    @Modifying
    @Query("DELETE FROM NewsTag nt WHERE nt.newsArticle.newsArticleId = :newsArticleId")
    void deleteByNewsArticleId(@Param("newsArticleId") Integer newsArticleId);
}
