package org.kun.asmbe.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccountDTO {
    private Integer accountId;
    
    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Account name must not exceed 100 characters")
    private String accountName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String accountEmail;
    
    @NotNull(message = "Account role is required")
    @Min(value = 1, message = "Role must be 1 (Admin) or 2 (Staff)")
    @Max(value = 2, message = "Role must be 1 (Admin) or 2 (Staff)")
    private Integer accountRole;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 255, message = "Password must be between 6 and 255 characters")
    private String accountPassword;
}
