package org.kun.asmbe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String accountEmail;
    
    @NotBlank(message = "Password is required")
    private String accountPassword;
}
