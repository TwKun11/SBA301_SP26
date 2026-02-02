package org.kun.lab4new.controllers;

import org.kun.lab4new.pojos.Orchid;
import org.kun.lab4new.services.IOrchidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    private IOrchidService iOrchidService;

    public OrchidController(IOrchidService iOrchidService) {
        this.iOrchidService = iOrchidService;
    }

    @GetMapping("")
    public ResponseEntity<List<Orchid>> fetchAll() {
        return ResponseEntity.ok(iOrchidService.getAllOrchids()); // 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> getOrchidByID(@PathVariable int id) {
        Optional<Orchid> o = iOrchidService.getOrchidByID(id);
        return ResponseEntity.ok(o); // 200 OK
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody Orchid orchid) {
        return iOrchidService.insertOrchid(orchid); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid o) {
        Orchid updateOrchid = iOrchidService.updateOrchid(id, o);
        return ResponseEntity.ok(updateOrchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        iOrchidService.deleteOrchid(id);
        return ResponseEntity.ok(null); // 200 OK - body: "Deleted!"
    }
}
