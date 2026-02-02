package org.kun.lab4new.services;

import org.kun.lab4new.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid insertOrchid(Orchid orchid);
    Orchid updateOrchid(int orchidID, Orchid orchid);
    void deleteOrchid(int orchidID);
    Optional<Orchid> getOrchidByID(int orchidID);
}
