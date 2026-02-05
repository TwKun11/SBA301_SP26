package org.kun.asmbe.service;

import org.kun.asmbe.dto.NewsArticleDTO;

import java.util.List;

public interface INewsArticleService {
    List<NewsArticleDTO> getAllNewsArticles();
    List<NewsArticleDTO> getActiveNewsArticles();
    NewsArticleDTO getNewsArticleById(Integer id);
    List<NewsArticleDTO> getNewsByCreator(Integer creatorId);
    List<NewsArticleDTO> searchActiveNews(String keyword);
    List<NewsArticleDTO> searchAllNews(String keyword);
    List<NewsArticleDTO> searchNewsByCreator(Integer creatorId, String keyword);
    NewsArticleDTO createNewsArticle(NewsArticleDTO newsArticleDTO);
    NewsArticleDTO updateNewsArticle(Integer id, NewsArticleDTO newsArticleDTO);
    void deleteNewsArticle(Integer id);
}
