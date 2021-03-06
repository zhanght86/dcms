package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Component generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "Component", catalog = "dcms_db")
public class Component implements java.io.Serializable {

    private Integer id;
    private String name;
    private String description;
    private Integer enable;

    public Component() {
    }

    public Component(String name, String description, Integer enable) {
        this.name = name;
        this.description = description;
        this.enable = enable;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)

    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "name", length = 256, columnDefinition = "")
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "description", length = 256, columnDefinition = "")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "enable")
    public Integer getEnable() {
        return this.enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

}
