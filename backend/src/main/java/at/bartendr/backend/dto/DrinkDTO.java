package at.bartendr.backend.dto;

import at.bartendr.backend.model.Location;

import java.util.Date;
import java.util.Set;

public class DrinkDTO {

    private Long id;
    private String name;
    private String category;
    private float price;
    private int age;
    private float rating;
    private Location locations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Location getLocations() {
        return locations;
    }

    public void setLocations(Location gender) {
        this.locations = locations;
    }


    public DrinkDTO() {
    }

    public DrinkDTO(Long id, String name, String category, float price, int age, float rating, Location location) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.locations = location;
    }
}
