package org.kun.asmbe.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.LoginDTO;
import org.kun.asmbe.dto.SystemAccountDTO;
import org.kun.asmbe.service.ISystemAccountService;
import org.kun.asmbe.service.SystemAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SystemAccountController {
    
    private final ISystemAccountService accountService;
    
    @GetMapping
    public ResponseEntity<List<SystemAccountDTO>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SystemAccountDTO> getAccountById(@PathVariable Integer id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<SystemAccountDTO>> searchAccounts(@RequestParam String keyword) {
        return ResponseEntity.ok(accountService.searchAccounts(keyword));
    }
    
    @PostMapping
    public ResponseEntity<SystemAccountDTO> createAccount(@Valid @RequestBody SystemAccountDTO accountDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(accountDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SystemAccountDTO> updateAccount(
            @PathVariable Integer id, 
            @Valid @RequestBody SystemAccountDTO accountDTO) {
        return ResponseEntity.ok(accountService.updateAccount(id, accountDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/login")
    public ResponseEntity<SystemAccountDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(accountService.login(loginDTO));
    }
}
