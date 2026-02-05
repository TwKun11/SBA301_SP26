package org.kun.asmbe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "SystemAccount")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Integer accountId;
    
    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Account name must not exceed 100 characters")
    @Column(name = "AccountName", nullable = false, length = 100)
    private String accountName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    @Column(name = "AccountEmail", nullable = false, unique = true, length = 100)
    private String accountEmail;
    
    @NotNull(message = "Account role is required")
    @Min(value = 1, message = "Role must be 1 (Admin) or 2 (Staff)")
    @Max(value = 2, message = "Role must be 1 (Admin) or 2 (Staff)")
    @Column(name = "AccountRole", nullable = false)
    private Integer accountRole;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 255, message = "Password must be between 6 and 255 characters")
    @Column(name = "AccountPassword", nullable = false, length = 255)
    private String accountPassword;
    
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.PERSIST)
    private List<NewsArticle> createdNewsArticles;
    
    @OneToMany(mappedBy = "updatedBy", cascade = CascadeType.PERSIST)
    private List<NewsArticle> updatedNewsArticles;
}