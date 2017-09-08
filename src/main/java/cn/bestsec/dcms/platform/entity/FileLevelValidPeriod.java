package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * FileLevelValidPeriod generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true, dynamicInsert = true)
@Table(name = "FileLevelValidPeriod", catalog = "dcms_db")
public class FileLevelValidPeriod implements java.io.Serializable {

    private Integer filelevel;
    private String validPeriod;
    private Integer isDesensity;
    private Integer showWatermark;
    private String keyword;

    public FileLevelValidPeriod() {
    }

    public FileLevelValidPeriod(Integer filelevel) {
        this.filelevel = filelevel;
    }

    public FileLevelValidPeriod(Integer filelevel, String validPeriod, String keyword) {
        this.filelevel = filelevel;
        this.validPeriod = validPeriod;
        this.setKeyword(keyword);
    }

    @Id

    @Column(name = "filelevel", unique = true, nullable = false)
    public Integer getFilelevel() {
        return this.filelevel;
    }

    public void setFilelevel(Integer filelevel) {
        this.filelevel = filelevel;
    }

    @Column(name = "validPeriod", length = 20, columnDefinition = "")
    public String getValidPeriod() {
        return this.validPeriod;
    }

    public void setValidPeriod(String validPeriod) {
        this.validPeriod = validPeriod;
    }

    @Column(name = "isDesensity")
    public Integer getIsDesensity() {
        return isDesensity;
    }

    public void setIsDesensity(Integer isDesensity) {
        this.isDesensity = isDesensity;
    }

    @Column(name = "showWatermark")
    public Integer getShowWatermark() {
        return showWatermark;
    }

    public void setShowWatermark(Integer showWatermark) {
        this.showWatermark = showWatermark;
    }

    @Column(name = "keyword", columnDefinition = "text")
    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

}
