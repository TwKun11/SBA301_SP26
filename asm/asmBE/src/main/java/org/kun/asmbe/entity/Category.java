package org.kun.asmbe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Integer categoryId;
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;
    
    @Size(max = 500, message = "Category description must not exceed 500 characters")
    @Column(name = "CategoryDescription", length = 500)
    private String categoryDescription;
    
    @Column(name = "ParentCategoryID")
    private Integer parentCategoryId;
    
    @NotNull(message = "Status is required")
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
    private List<NewsArticle> newsArticles;
}
