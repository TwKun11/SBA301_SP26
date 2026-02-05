package org.kun.asmbe.service;

import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.LoginDTO;
import org.kun.asmbe.dto.SystemAccountDTO;
import org.kun.asmbe.entity.SystemAccount;
import org.kun.asmbe.exception.BadRequestException;
import org.kun.asmbe.exception.ResourceNotFoundException;
import org.kun.asmbe.repository.SystemAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SystemAccountService implements ISystemAccountService {
    
    private final SystemAccountRepository accountRepository;
    
    @Transactional(readOnly = true)
    public List<SystemAccountDTO> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public SystemAccountDTO getAccountById(Integer id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        return convertToDTO(account);
    }
    
    @Transactional(readOnly = true)
    public List<SystemAccountDTO> searchAccounts(String keyword) {
        return accountRepository.searchAccounts(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public SystemAccountDTO createAccount(SystemAccountDTO accountDTO) {
        // Check if email already exists
        if (accountRepository.findByAccountEmail(accountDTO.getAccountEmail()).isPresent()) {
            throw new BadRequestException("Email already exists: " + accountDTO.getAccountEmail());
        }
        
        SystemAccount account = convertToEntity(accountDTO);
        SystemAccount savedAccount = accountRepository.save(account);
        return convertToDTO(savedAccount);
    }
    
    @Transactional
    public SystemAccountDTO updateAccount(Integer id, SystemAccountDTO accountDTO) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        
        // Check if email is being changed and if new email already exists
        if (!account.getAccountEmail().equals(accountDTO.getAccountEmail())) {
            if (accountRepository.findByAccountEmail(accountDTO.getAccountEmail()).isPresent()) {
                throw new BadRequestException("Email already exists: " + accountDTO.getAccountEmail());
            }
        }
        
        account.setAccountName(accountDTO.getAccountName());
        account.setAccountEmail(accountDTO.getAccountEmail());
        account.setAccountRole(accountDTO.getAccountRole());
        if (accountDTO.getAccountPassword() != null && !accountDTO.getAccountPassword().isEmpty()) {
            account.setAccountPassword(accountDTO.getAccountPassword());
        }
        
        SystemAccount updatedAccount = accountRepository.save(account);
        return convertToDTO(updatedAccount);
    }
    
    @Transactional
    public void deleteAccount(Integer id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        
        // Check if account has created any news articles
        if (accountRepository.hasCreatedNewsArticles(id)) {
            throw new BadRequestException("Cannot delete account. Account has created news articles.");
        }
        
        accountRepository.delete(account);
    }
    
    @Transactional(readOnly = true)
    public SystemAccountDTO login(LoginDTO loginDTO) {
        SystemAccount account = accountRepository.findByAccountEmail(loginDTO.getAccountEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
        
        if (!account.getAccountPassword().equals(loginDTO.getAccountPassword())) {
            throw new BadRequestException("Invalid email or password");
        }
        
        return convertToDTO(account);
    }
    
    private SystemAccountDTO convertToDTO(SystemAccount account) {
        SystemAccountDTO dto = new SystemAccountDTO();
        dto.setAccountId(account.getAccountId());
        dto.setAccountName(account.getAccountName());
        dto.setAccountEmail(account.getAccountEmail());
        dto.setAccountRole(account.getAccountRole());
        // Don't send password back in DTO for security
        dto.setAccountPassword(null);
        return dto;
    }
    
    private SystemAccount convertToEntity(SystemAccountDTO dto) {
        SystemAccount account = new SystemAccount();
        account.setAccountId(dto.getAccountId());
        account.setAccountName(dto.getAccountName());
        account.setAccountEmail(dto.getAccountEmail());
        account.setAccountRole(dto.getAccountRole());
        account.setAccountPassword(dto.getAccountPassword());
        return account;
    }
}
