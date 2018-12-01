package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int temperatureCelsius;
    private int temperatureFahrenheit;

    @Column(name = "is_alcoholic", columnDefinition = "TINYINT(1)")
    //@Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isAlcoholic;
    private String color;
    private String description;
    private String style;

    @ManyToOne
    @JsonIgnoreProperties("drinks")
    private Place place;

    @ManyToOne
    @JsonIgnoreProperties("drinks")
    private Size size;

    @ManyToOne
    @JsonIgnoreProperties("drinks")
    private Category category;

    @Version
    @JsonIgnore
    private long version;

    public Drink() {
    }

    // apply same hack as in size with boolean flag for unit
    public Drink(String name, int temperature, boolean isAlcoholic, String color, String description, String style, boolean unitCelsius) {
        this.name = name;
        if (unitCelsius) {
            this.temperatureCelsius = temperature;
            this.temperatureFahrenheit = (int) Math.round((temperature * 1.8) + 32);
        } else {
            this.temperatureFahrenheit = temperature;
            this.temperatureCelsius = (int) Math.round((temperature - 32) * 1.8);
        }
        this.isAlcoholic = isAlcoholic;
        this.color = color;
        this.description = description;
        this.style = style;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Drink drink = (Drink) o;
        return id == drink.id &&
                temperatureCelsius == drink.temperatureCelsius &&
                temperatureFahrenheit == drink.temperatureFahrenheit &&
                isAlcoholic == drink.isAlcoholic &&
                name.equals(drink.name) &&
                Objects.equals(color, drink.color) &&
                Objects.equals(description, drink.description) &&
                Objects.equals(style, drink.style) &&
                Objects.equals(place, drink.place) &&
                Objects.equals(size, drink.size) &&
                Objects.equals(category, drink.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, temperatureCelsius, temperatureFahrenheit, isAlcoholic, color, description, style, place, size, category);
    }

    public int getTemperatureFahrenheit() {
        return temperatureFahrenheit;
    }

    public void setTemperatureFahrenheit(int temperatureFahrenheit) {
        this.temperatureFahrenheit = temperatureFahrenheit;
    }

    @Override
    public String toString() {
        return "Drink{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", temperatureCelsius=" + temperatureCelsius +
                ", isAlcoholic=" + isAlcoholic +
                ", color='" + color + '\'' +
                ", description='" + description + '\'' +
                ", style='" + style + '\'' +
                ", place=" + place +
                ", size=" + size +
                ", category=" + category +
                ", version=" + version +
                '}';
    }

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

    public int getTemperatureCelsius() {
        return temperatureCelsius;
    }

    public void setTemperatureCelsius(int temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }

    public boolean isAlcoholic() {
        return isAlcoholic;
    }

    public void setAlcoholic(boolean alcoholic) {
        isAlcoholic = alcoholic;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}
