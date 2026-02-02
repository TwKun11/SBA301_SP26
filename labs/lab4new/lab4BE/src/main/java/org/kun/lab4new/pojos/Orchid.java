package org.kun.lab4new.pojos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "orchid")
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("orchids")
    private Category category;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidUrl;

    // Constructors
    public Orchid() {}

    public Orchid(Integer orchidId, String name, Boolean isNatural,
                  String orchidDescription, Category category,
                  Boolean isAttractive, String orchidUrl) {
        this.orchidId = orchidId;
        this.name = name;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.category = category;
        this.isAttractive = isAttractive;
        this.orchidUrl = orchidUrl;
    }

    // Getters & Setters
    public Integer getOrchidId() {
        return orchidId;
    }

    public void setOrchidId(Integer orchidId) {
        this.orchidId = orchidId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsNatural() {
        return isNatural;
    }

    public void setIsNatural(Boolean isNatural) {
        this.isNatural = isNatural;
    }

    public String getOrchidDescription() {
        return orchidDescription;
    }

    public void setOrchidDescription(String orchidDescription) {
        this.orchidDescription = orchidDescription;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getIsAttractive() {
        return isAttractive;
    }

    public void setIsAttractive(Boolean isAttractive) {
        this.isAttractive = isAttractive;
    }

    public String getOrchidUrl() {
        return orchidUrl;
    }

    public void setOrchidUrl(String orchidUrl) {
        this.orchidUrl = orchidUrl;
    }
}
