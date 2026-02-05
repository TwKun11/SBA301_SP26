package org.kun.asmbe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "NewsTag")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsTag {
    
    @EmbeddedId
    private NewsTagId id;
    
    @ManyToOne
    @MapsId("newsArticleId")
    @JoinColumn(name = "NewsArticleID")
    private NewsArticle newsArticle;
    
    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "TagID")
    private Tag tag;
    
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewsTagId implements Serializable {
        @Column(name = "NewsArticleID")
        private Integer newsArticleId;
        
        @Column(name = "TagID")
        private Integer tagId;
    }
}
