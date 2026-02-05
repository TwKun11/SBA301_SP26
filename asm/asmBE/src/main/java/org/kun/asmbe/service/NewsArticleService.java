package org.kun.asmbe.service;

import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.NewsArticleDTO;
import org.kun.asmbe.entity.*;
import org.kun.asmbe.exception.ResourceNotFoundException;
import org.kun.asmbe.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsArticleService implements INewsArticleService {
    
    private final NewsArticleRepository newsArticleRepository;
    private final CategoryRepository categoryRepository;
    private final SystemAccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final NewsTagRepository newsTagRepository;
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> getAllNewsArticles() {
        return newsArticleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> getActiveNewsArticles() {
        return newsArticleRepository.findByNewsStatus(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public NewsArticleDTO getNewsArticleById(Integer id) {
        NewsArticle newsArticle = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));
        return convertToDTO(newsArticle);
    }
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> getNewsByCreator(Integer creatorId) {
        return newsArticleRepository.findByCreatedById(creatorId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> searchActiveNews(String keyword) {
        return newsArticleRepository.searchActiveNews(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> searchAllNews(String keyword) {
        return newsArticleRepository.searchAllNews(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NewsArticleDTO> searchNewsByCreator(Integer creatorId, String keyword) {
        return newsArticleRepository.searchNewsByCreator(creatorId, keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public NewsArticleDTO createNewsArticle(NewsArticleDTO newsArticleDTO) {
        // Validate category exists
        categoryRepository.findById(newsArticleDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + newsArticleDTO.getCategoryId()));
        
        // Validate creator exists
        accountRepository.findById(newsArticleDTO.getCreatedById())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + newsArticleDTO.getCreatedById()));
        
        NewsArticle newsArticle = convertToEntity(newsArticleDTO);
        NewsArticle savedNewsArticle = newsArticleRepository.save(newsArticle);
        
        // Handle tags
        if (newsArticleDTO.getTagIds() != null && !newsArticleDTO.getTagIds().isEmpty()) {
            for (Integer tagId : newsArticleDTO.getTagIds()) {
                Tag tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + tagId));
                
                NewsTag newsTag = new NewsTag();
                NewsTag.NewsTagId newsTagId = new NewsTag.NewsTagId(savedNewsArticle.getNewsArticleId(), tagId);
                newsTag.setId(newsTagId);
                newsTag.setNewsArticle(savedNewsArticle);
                newsTag.setTag(tag);
                newsTagRepository.save(newsTag);
            }
        }
        
        return convertToDTO(savedNewsArticle);
    }
    
    @Transactional
    public NewsArticleDTO updateNewsArticle(Integer id, NewsArticleDTO newsArticleDTO) {
        NewsArticle newsArticle = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));
        
        // Validate category exists
        categoryRepository.findById(newsArticleDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + newsArticleDTO.getCategoryId()));
        
        // Validate updater exists if provided
        if (newsArticleDTO.getUpdatedById() != null) {
            accountRepository.findById(newsArticleDTO.getUpdatedById())
                    .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + newsArticleDTO.getUpdatedById()));
        }
        
        newsArticle.setNewsTitle(newsArticleDTO.getNewsTitle());
        newsArticle.setHeadline(newsArticleDTO.getHeadline());
        newsArticle.setNewsContent(newsArticleDTO.getNewsContent());
        newsArticle.setNewsSource(newsArticleDTO.getNewsSource());
        newsArticle.setCategoryId(newsArticleDTO.getCategoryId());
        newsArticle.setNewsStatus(newsArticleDTO.getNewsStatus());
        newsArticle.setCreatedById(newsArticleDTO.getUpdatedById());
        
        NewsArticle updatedNewsArticle = newsArticleRepository.save(newsArticle);
        
        // Update tags - delete existing and add new ones
        newsTagRepository.deleteByNewsArticleId(id);
        
        if (newsArticleDTO.getTagIds() != null && !newsArticleDTO.getTagIds().isEmpty()) {
            for (Integer tagId : newsArticleDTO.getTagIds()) {
                Tag tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + tagId));
                
                NewsTag newsTag = new NewsTag();
                NewsTag.NewsTagId newsTagId = new NewsTag.NewsTagId(id, tagId);
                newsTag.setId(newsTagId);
                newsTag.setNewsArticle(updatedNewsArticle);
                newsTag.setTag(tag);
                newsTagRepository.save(newsTag);
            }
        }
        
        return convertToDTO(updatedNewsArticle);
    }
    
    @Transactional
    public void deleteNewsArticle(Integer id) {
        NewsArticle newsArticle = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));
        
        // Delete associated tags first
        newsTagRepository.deleteByNewsArticleId(id);
        
        newsArticleRepository.delete(newsArticle);
    }
    
    private NewsArticleDTO convertToDTO(NewsArticle newsArticle) {
        NewsArticleDTO dto = new NewsArticleDTO();
        dto.setNewsArticleId(newsArticle.getNewsArticleId());
        dto.setNewsTitle(newsArticle.getNewsTitle());
        dto.setHeadline(newsArticle.getHeadline());
        dto.setCreatedDate(newsArticle.getCreatedDate());
        dto.setNewsContent(newsArticle.getNewsContent());
        dto.setNewsSource(newsArticle.getNewsSource());
        dto.setCategoryId(newsArticle.getCategoryId());
        dto.setNewsStatus(newsArticle.getNewsStatus());
        dto.setCreatedById(newsArticle.getCreatedById());
        dto.setUpdatedById(newsArticle.getUpdatedById());
        dto.setModifiedDate(newsArticle.getModifiedDate());
        
        // Set category name
        if (newsArticle.getCategory() != null) {
            dto.setCategoryName(newsArticle.getCategory().getCategoryName());
        }
        
        // Set creator name
        if (newsArticle.getCreatedBy() != null) {
            dto.setCreatedByName(newsArticle.getCreatedBy().getAccountName());
        }
        
        // Set updater name
        if (newsArticle.getUpdatedBy() != null) {
            dto.setUpdatedByName(newsArticle.getUpdatedBy().getAccountName());
        }
        
        // Set tags
        List<NewsTag> newsTags = newsTagRepository.findByNewsArticleId(newsArticle.getNewsArticleId());
        if (newsTags != null && !newsTags.isEmpty()) {
            dto.setTagIds(newsTags.stream()
                    .map(nt -> nt.getTag().getTagId())
                    .collect(Collectors.toList()));
            dto.setTagNames(newsTags.stream()
                    .map(nt -> nt.getTag().getTagName())
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }
    
    private NewsArticle convertToEntity(NewsArticleDTO dto) {
        NewsArticle newsArticle = new NewsArticle();
        newsArticle.setNewsArticleId(dto.getNewsArticleId());
        newsArticle.setNewsTitle(dto.getNewsTitle());
        newsArticle.setHeadline(dto.getHeadline());
        newsArticle.setNewsContent(dto.getNewsContent());
        newsArticle.setNewsSource(dto.getNewsSource());
        newsArticle.setCategoryId(dto.getCategoryId());
        newsArticle.setNewsStatus(dto.getNewsStatus());
        newsArticle.setCreatedById(dto.getCreatedById());
        newsArticle.setUpdatedById(dto.getUpdatedById());
        return newsArticle;
    }
}
