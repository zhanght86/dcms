package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * FileLevelDecideUnit generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "FileLevelDecideUnit", catalog = "dcms_db")
public class FileLevelDecideUnit implements java.io.Serializable {

    private String unitNo;
    private String name;
    private String description;
    private Integer major;

    public FileLevelDecideUnit() {
    }

    public FileLevelDecideUnit(String unitNo) {
        this.unitNo = unitNo;
    }

    public FileLevelDecideUnit(String unitNo, String name, String description, Integer major) {
        this.unitNo = unitNo;
        this.name = name;
        this.description = description;
        this.major = major;
    }

    @Id

    @Column(name = "unitNo", unique = true, nullable = false, length = 256)
    public String getUnitNo() {
        return this.unitNo;
    }

    public void setUnitNo(String unitNo) {
        this.unitNo = unitNo;
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

    @Column(name = "major")
    public Integer getMajor() {
        return this.major;
    }

    public void setMajor(Integer major) {
        this.major = major;
    }

}
