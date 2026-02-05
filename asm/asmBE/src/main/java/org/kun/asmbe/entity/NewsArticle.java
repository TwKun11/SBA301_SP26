package org.kun.asmbe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "NewsArticle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID")
    private Integer newsArticleId;
    
    @NotBlank(message = "News title is required")
    @Size(max = 200, message = "News title must not exceed 200 characters")
    @Column(name = "NewsTitle", nullable = false, length = 200)
    private String newsTitle;
    
    @NotBlank(message = "Headline is required")
    @Size(max = 500, message = "Headline must not exceed 500 characters")
    @Column(name = "Headline", nullable = false, length = 500)
    private String headline;
    
    @Column(name = "CreatedDate")
    private LocalDateTime createdDate;
    
    @NotBlank(message = "News content is required")
    @Column(name = "NewsContent", nullable = false, columnDefinition = "TEXT")
    private String newsContent;
    
    @Size(max = 100, message = "News source must not exceed 100 characters")
    @Column(name = "NewsSource", length = 100)
    private String newsSource;
    
    @NotNull(message = "Category is required")
    @Column(name = "CategoryID", nullable = false)
    private Integer categoryId;
    
    @NotNull(message = "News status is required")
    @Column(name = "NewsStatus", nullable = false)
    private Boolean newsStatus = true;
    
    @NotNull(message = "Created by is required")
    @Column(name = "CreatedByID", nullable = false)
    private Integer createdById;
    
    @Column(name = "UpdatedByID")
    private Integer updatedById;
    
    @Column(name = "ModifiedDate")
    private LocalDateTime modifiedDate;
    
    @ManyToOne
    @JoinColumn(name = "CategoryID", insertable = false, updatable = false)
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "CreatedByID", insertable = false, updatable = false)
    private SystemAccount createdBy;
    
    @ManyToOne
    @JoinColumn(name = "UpdatedByID", insertable = false, updatable = false)
    private SystemAccount updatedBy;
    
    @OneToMany(mappedBy = "newsArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsTag> newsTags;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}
