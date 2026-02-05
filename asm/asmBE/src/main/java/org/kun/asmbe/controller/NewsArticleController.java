package org.kun.asmbe.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.NewsArticleDTO;
import org.kun.asmbe.service.INewsArticleService;
import org.kun.asmbe.service.NewsArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NewsArticleController {
    
    private final INewsArticleService newsArticleService;
    
    @GetMapping
    public ResponseEntity<List<NewsArticleDTO>> getAllNewsArticles() {
        return ResponseEntity.ok(newsArticleService.getAllNewsArticles());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<NewsArticleDTO>> getActiveNewsArticles() {
        return ResponseEntity.ok(newsArticleService.getActiveNewsArticles());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticleDTO> getNewsArticleById(@PathVariable Integer id) {
        return ResponseEntity.ok(newsArticleService.getNewsArticleById(id));
    }
    
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<NewsArticleDTO>> getNewsByCreator(@PathVariable Integer creatorId) {
        return ResponseEntity.ok(newsArticleService.getNewsByCreator(creatorId));
    }
    
    @GetMapping("/search/active")
    public ResponseEntity<List<NewsArticleDTO>> searchActiveNews(@RequestParam String keyword) {
        return ResponseEntity.ok(newsArticleService.searchActiveNews(keyword));
    }
    
    @GetMapping("/search/all")
    public ResponseEntity<List<NewsArticleDTO>> searchAllNews(@RequestParam String keyword) {
        return ResponseEntity.ok(newsArticleService.searchAllNews(keyword));
    }
    
    @GetMapping("/search/creator/{creatorId}")
    public ResponseEntity<List<NewsArticleDTO>> searchNewsByCreator(
            @PathVariable Integer creatorId, 
            @RequestParam String keyword) {
        return ResponseEntity.ok(newsArticleService.searchNewsByCreator(creatorId, keyword));
    }
    
    @PostMapping
    public ResponseEntity<NewsArticleDTO> createNewsArticle(@Valid @RequestBody NewsArticleDTO newsArticleDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(newsArticleService.createNewsArticle(newsArticleDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<NewsArticleDTO> updateNewsArticle(
            @PathVariable Integer id, 
            @Valid @RequestBody NewsArticleDTO newsArticleDTO) {
        return ResponseEntity.ok(newsArticleService.updateNewsArticle(id, newsArticleDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNewsArticle(@PathVariable Integer id) {
        newsArticleService.deleteNewsArticle(id);
        return ResponseEntity.noContent().build();
    }
}
