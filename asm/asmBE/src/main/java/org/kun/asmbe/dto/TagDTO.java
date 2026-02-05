package org.kun.asmbe.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagDTO {
    private Integer tagId;
    
    @NotBlank(message = "Tag name is required")
    @Size(max = 50, message = "Tag name must not exceed 50 characters")
    private String tagName;
    
    @Size(max = 255, message = "Note must not exceed 255 characters")
    private String note;
}
