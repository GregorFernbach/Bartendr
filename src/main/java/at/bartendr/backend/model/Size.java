package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int volML;
    private int volFlOz;

    @OneToMany(mappedBy = "size")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

    public Size() {
    }

    // have to cheat a little to accomplish unit conversion. last parameter defines unit: true -> ml, false -> floz
    // this can and will be solved more elegantly
    public Size(String name, int vol, boolean unitML) {
        this.name = name;
        if (unitML) {
            this.volML = vol;
            this.volFlOz = (int) Math.round(vol / 29.5735);
        } else {
            this.volFlOz = vol;
            this.volML = (int) Math.round(vol * 29.5735);
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVolML() {
        return volML;
    }

    public void setVolML(int volML) {
        this.volML = volML;
    }

    public int getVolFlOz() {
        return volFlOz;
    }

    public void setVolFlOz(int volFlOz) {
        this.volFlOz = volFlOz;
    }

    public List<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Drink> drinks) {
        this.drinks = drinks;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Size size = (Size) o;
        return id == size.id &&
                volML == size.volML &&
                volFlOz == size.volFlOz &&
                name.equals(size.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, volML, volFlOz);
    }

    @Override
    public String toString() {
        return "Size{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", volML=" + volML +
                ", volFlOz=" + volFlOz +
                ", drinks=" + drinks +
                ", version=" + version +
                '}';
    }
}
