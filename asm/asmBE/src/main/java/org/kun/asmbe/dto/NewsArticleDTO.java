package org.kun.asmbe.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleDTO {
    private Integer newsArticleId;
    
    @NotBlank(message = "News title is required")
    @Size(max = 200, message = "News title must not exceed 200 characters")
    private String newsTitle;
    
    @NotBlank(message = "Headline is required")
    @Size(max = 500, message = "Headline must not exceed 500 characters")
    private String headline;
    
    private LocalDateTime createdDate;
    
    @NotBlank(message = "News content is required")
    private String newsContent;
    
    @Size(max = 100, message = "News source must not exceed 100 characters")
    private String newsSource;
    
    @NotNull(message = "Category is required")
    private Integer categoryId;
    
    private String categoryName;
    
    @NotNull(message = "News status is required")
    private Boolean newsStatus;
    
    @NotNull(message = "Created by is required")
    private Integer createdById;
    
    private String createdByName;
    
    private Integer updatedById;
    
    private String updatedByName;
    
    private LocalDateTime modifiedDate;
    
    private List<Integer> tagIds;
    
    private List<String> tagNames;
}
