package org.kun.asmbe.repository;

import org.kun.asmbe.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {
    
    Optional<SystemAccount> findByAccountEmail(String accountEmail);
    
    @Query("SELECT a FROM SystemAccount a WHERE " +
           "LOWER(a.accountName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.accountEmail) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<SystemAccount> searchAccounts(@Param("keyword") String keyword);
    
    List<SystemAccount> findByAccountRole(Integer accountRole);
    
    @Query("SELECT CASE WHEN COUNT(n) > 0 THEN true ELSE false END " +
           "FROM NewsArticle n WHERE n.createdById = :accountId")
    boolean hasCreatedNewsArticles(@Param("accountId") Integer accountId);
}
