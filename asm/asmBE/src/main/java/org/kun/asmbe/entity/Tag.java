package org.kun.asmbe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID")
    private Integer tagId;
    
    @NotBlank(message = "Tag name is required")
    @Size(max = 50, message = "Tag name must not exceed 50 characters")
    @Column(name = "TagName", nullable = false, length = 50)
    private String tagName;
    
    @Size(max = 255, message = "Note must not exceed 255 characters")
    @Column(name = "Note", length = 255)
    private String note;
}
