package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * FileLevelChangeHistory generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "FileLevelChangeHistory", catalog = "dcms_db")
public class FileLevelChangeHistory implements java.io.Serializable {

    private Integer id;
    private File file;
    private User userByFkUid;
    private User userByFkFileLevelDecideUid;
    private Integer lastLevel;
    private String description;
    private Long fileLevelChangeTime;
    private String validPeriod;
    private Integer lastDurationType;
    private String lastDurationDescription;
    private Long lastFileLevelDecideTime;
    private Long lastFileDecryptTime;
    private Integer levelAltered;
    private Integer durationAltered;

    public FileLevelChangeHistory() {
    }

    public FileLevelChangeHistory(File file, User userByFkUid, User userByFkFileLevelDecideUid, Integer lastLevel,
            String description, Long fileLevelChangeTime, String validPeriod, Integer lastDurationType,
            String lastDurationDescription, Long lastFileLevelDecideTime, Long lastFileDecryptTime,
            Integer levelAltered, Integer durationAltered) {
        this.file = file;
        this.userByFkUid = userByFkUid;
        this.userByFkFileLevelDecideUid = userByFkFileLevelDecideUid;
        this.lastLevel = lastLevel;
        this.description = description;
        this.fileLevelChangeTime = fileLevelChangeTime;
        this.validPeriod = validPeriod;
        this.lastDurationType = lastDurationType;
        this.lastDurationDescription = lastDurationDescription;
        this.lastFileLevelDecideTime = lastFileLevelDecideTime;
        this.lastFileDecryptTime = lastFileDecryptTime;
        this.levelAltered = levelAltered;
        this.durationAltered = durationAltered;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkFid")
    public File getFile() {
        return this.file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkUid")
    public User getUserByFkUid() {
        return this.userByFkUid;
    }

    public void setUserByFkUid(User userByFkUid) {
        this.userByFkUid = userByFkUid;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkFileLevelDecideUid")
    public User getUserByFkFileLevelDecideUid() {
        return this.userByFkFileLevelDecideUid;
    }

    public void setUserByFkFileLevelDecideUid(User userByFkFileLevelDecideUid) {
        this.userByFkFileLevelDecideUid = userByFkFileLevelDecideUid;
    }

    @Column(name = "lastLevel")
    public Integer getLastLevel() {
        return this.lastLevel;
    }

    public void setLastLevel(Integer lastLevel) {
        this.lastLevel = lastLevel;
    }

    @Column(name = "description", length = 256, columnDefinition = "")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "fileLevelChangeTime")
    public Long getFileLevelChangeTime() {
        return this.fileLevelChangeTime;
    }

    public void setFileLevelChangeTime(Long fileLevelChangeTime) {
        this.fileLevelChangeTime = fileLevelChangeTime;
    }

    @Column(name = "validPeriod", length = 20, columnDefinition = "")
    public String getValidPeriod() {
        return this.validPeriod;
    }

    public void setValidPeriod(String validPeriod) {
        this.validPeriod = validPeriod;
    }

    @Column(name = "lastDurationType")
    public Integer getLastDurationType() {
        return this.lastDurationType;
    }

    public void setLastDurationType(Integer lastDurationType) {
        this.lastDurationType = lastDurationType;
    }

    @Column(name = "lastDurationDescription", length = 1024, columnDefinition = "")
    public String getLastDurationDescription() {
        return this.lastDurationDescription;
    }

    public void setLastDurationDescription(String lastDurationDescription) {
        this.lastDurationDescription = lastDurationDescription;
    }

    @Column(name = "lastFileLevelDecideTime")
    public Long getLastFileLevelDecideTime() {
        return this.lastFileLevelDecideTime;
    }

    public void setLastFileLevelDecideTime(Long lastFileLevelDecideTime) {
        this.lastFileLevelDecideTime = lastFileLevelDecideTime;
    }

    @Column(name = "lastFileDecryptTime")
    public Long getLastFileDecryptTime() {
        return this.lastFileDecryptTime;
    }

    public void setLastFileDecryptTime(Long lastFileDecryptTime) {
        this.lastFileDecryptTime = lastFileDecryptTime;
    }

    @Column(name = "levelAltered")
    public Integer getLevelAltered() {
        return this.levelAltered;
    }

    public void setLevelAltered(Integer levelAltered) {
        this.levelAltered = levelAltered;
    }

    @Column(name = "durationAltered")
    public Integer getDurationAltered() {
        return this.durationAltered;
    }

    public void setDurationAltered(Integer durationAltered) {
        this.durationAltered = durationAltered;
    }

}
