package org.kun.asmbe.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.TagDTO;
import org.kun.asmbe.service.ITagService;
import org.kun.asmbe.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TagController {
    
    private final ITagService tagService;
    
    @GetMapping
    public ResponseEntity<List<TagDTO>> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TagDTO> getTagById(@PathVariable Integer id) {
        return ResponseEntity.ok(tagService.getTagById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TagDTO>> searchTags(@RequestParam String keyword) {
        return ResponseEntity.ok(tagService.searchTags(keyword));
    }
    
    @PostMapping
    public ResponseEntity<TagDTO> createTag(@Valid @RequestBody TagDTO tagDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tagService.createTag(tagDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(
            @PathVariable Integer id, 
            @Valid @RequestBody TagDTO tagDTO) {
        return ResponseEntity.ok(tagService.updateTag(id, tagDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Integer id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
