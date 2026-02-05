package org.kun.asmbe.service;

import org.kun.asmbe.dto.TagDTO;

import java.util.List;

public interface ITagService {
    List<TagDTO> getAllTags();
    TagDTO getTagById(Integer id);
    List<TagDTO> searchTags(String keyword);
    TagDTO createTag(TagDTO tagDTO);
    TagDTO updateTag(Integer id, TagDTO tagDTO);
    void deleteTag(Integer id);
}
