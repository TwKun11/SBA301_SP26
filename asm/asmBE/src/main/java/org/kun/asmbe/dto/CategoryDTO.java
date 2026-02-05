package org.kun.asmbe.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Integer categoryId;
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String categoryName;
    
    @Size(max = 500, message = "Category description must not exceed 500 characters")
    private String categoryDescription;
    
    private Integer parentCategoryId;
    
    @NotNull(message = "Status is required")
    private Boolean isActive;
}
