package org.kun.asmbe.service;

import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.TagDTO;
import org.kun.asmbe.entity.Tag;
import org.kun.asmbe.exception.BadRequestException;
import org.kun.asmbe.exception.ResourceNotFoundException;
import org.kun.asmbe.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService implements ITagService {
    
    private final TagRepository tagRepository;
    
    @Transactional(readOnly = true)
    public List<TagDTO> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TagDTO getTagById(Integer id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        return convertToDTO(tag);
    }
    
    @Transactional(readOnly = true)
    public List<TagDTO> searchTags(String keyword) {
        return tagRepository.searchTags(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public TagDTO createTag(TagDTO tagDTO) {
        // Check if tag name already exists
        if (tagRepository.findByTagName(tagDTO.getTagName()).isPresent()) {
            throw new BadRequestException("Tag name already exists: " + tagDTO.getTagName());
        }
        
        Tag tag = convertToEntity(tagDTO);
        Tag savedTag = tagRepository.save(tag);
        return convertToDTO(savedTag);
    }
    
    @Transactional
    public TagDTO updateTag(Integer id, TagDTO tagDTO) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        
        // Check if tag name is being changed and if new name already exists
        if (!tag.getTagName().equals(tagDTO.getTagName())) {
            if (tagRepository.findByTagName(tagDTO.getTagName()).isPresent()) {
                throw new BadRequestException("Tag name already exists: " + tagDTO.getTagName());
            }
        }
        
        tag.setTagName(tagDTO.getTagName());
        tag.setNote(tagDTO.getNote());
        
        Tag updatedTag = tagRepository.save(tag);
        return convertToDTO(updatedTag);
    }
    
    @Transactional
    public void deleteTag(Integer id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        tagRepository.delete(tag);
    }
    
    private TagDTO convertToDTO(Tag tag) {
        TagDTO dto = new TagDTO();
        dto.setTagId(tag.getTagId());
        dto.setTagName(tag.getTagName());
        dto.setNote(tag.getNote());
        return dto;
    }
    
    private Tag convertToEntity(TagDTO dto) {
        Tag tag = new Tag();
        tag.setTagId(dto.getTagId());
        tag.setTagName(dto.getTagName());
        tag.setNote(dto.getNote());
        return tag;
    }
}
