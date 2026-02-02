package org.kun.lab4new.services;

import org.kun.lab4new.exceptions.ResourceNotFoundException;
import org.kun.lab4new.pojos.Category;
import org.kun.lab4new.pojos.Orchid;
import org.kun.lab4new.repositories.ICategoryRepository;
import org.kun.lab4new.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    private IOrchidRepository iOrchidRepository;
    private ICategoryRepository iCategoryRepository;

    public OrchidService(IOrchidRepository iOrchidRepository, ICategoryRepository iCategoryRepository) {
        this.iOrchidRepository = iOrchidRepository;
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        if (orchid.getCategory() != null && orchid.getCategory().getCategoryId() != null) {
            Category category = iCategoryRepository.findById(orchid.getCategory().getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + orchid.getCategory().getCategoryId()));
            orchid.setCategory(category);
        }
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid updateOrchid = iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new ResourceNotFoundException("Orchid not found with id: " + orchidID));
        
        updateOrchid.setName(orchid.getName());
        updateOrchid.setIsNatural(orchid.getIsNatural());
        updateOrchid.setOrchidDescription(orchid.getOrchidDescription());
        
        if (orchid.getCategory() != null && orchid.getCategory().getCategoryId() != null) {
            Category category = iCategoryRepository.findById(orchid.getCategory().getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + orchid.getCategory().getCategoryId()));
            updateOrchid.setCategory(category);
        }
        
        updateOrchid.setIsAttractive(orchid.getIsAttractive());
        updateOrchid.setOrchidUrl(orchid.getOrchidUrl());
        return iOrchidRepository.save(updateOrchid);
    }

    @Override
    public void deleteOrchid(int orchidID) {
        if (!iOrchidRepository.existsById(orchidID)) {
            throw new ResourceNotFoundException("Orchid not found with id: " + orchidID);
        }
        iOrchidRepository.deleteById(orchidID);
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        Optional<Orchid> orchid = iOrchidRepository.findById(orchidID);
        if (orchid.isEmpty()) {
            throw new ResourceNotFoundException("Orchid not found with id: " + orchidID);
        }
        return orchid;
    }
}
