package org.kun.asmbe.repository;

import org.kun.asmbe.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    
    Optional<Tag> findByTagName(String tagName);
    
    @Query("SELECT t FROM Tag t WHERE " +
           "LOWER(t.tagName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Tag> searchTags(@Param("keyword") String keyword);
}
