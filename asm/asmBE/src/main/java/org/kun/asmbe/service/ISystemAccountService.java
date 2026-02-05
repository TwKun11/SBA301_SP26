package org.kun.asmbe.service;

import org.kun.asmbe.dto.LoginDTO;
import org.kun.asmbe.dto.SystemAccountDTO;

import java.util.List;

public interface ISystemAccountService {
    List<SystemAccountDTO> getAllAccounts();
    SystemAccountDTO getAccountById(Integer id);
    List<SystemAccountDTO> searchAccounts(String keyword);
    SystemAccountDTO createAccount(SystemAccountDTO accountDTO);
    SystemAccountDTO updateAccount(Integer id, SystemAccountDTO accountDTO);
    void deleteAccount(Integer id);
    SystemAccountDTO login(LoginDTO loginDTO);
}
