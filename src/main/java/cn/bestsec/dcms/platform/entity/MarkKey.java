package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * License generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true, dynamicInsert = true)
@Table(name = "MarkKey", catalog = "dcms_db")
public class MarkKey implements java.io.Serializable {

    private Integer id;
    private Admin admin;
    private String pubKey;
    private String priKey;
    private Integer markVersion;
    private String keyId;
    private String keyName;
    private Integer keyLength;
    private Long createTime;
    private Integer createFrom;
    private Integer enable;

    public MarkKey() {
    }

    public MarkKey(Admin admin, String pubKey, String priKey, Integer markVersion, String keyId, String keyName,
            Integer keyLength, Long createTime, Integer createFrom, Integer enable) {
        this.admin = admin;
        this.pubKey = pubKey;
        this.priKey = priKey;
        this.markVersion = markVersion;
        this.keyId = keyId;
        this.keyName = keyName;
        this.keyLength = keyLength;
        this.createTime = createTime;
        this.createFrom = createFrom;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkAid")
    public Admin getAdmin() {
        return this.admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    @Column(name = "pubKey", length = 1024, columnDefinition = "")
    public String getPubKey() {
        return pubKey;
    }

    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }

    @Column(name = "priKey", length = 1024, columnDefinition = "")
    public String getPriKey() {
        return priKey;
    }

    public void setPriKey(String priKey) {
        this.priKey = priKey;
    }

    @Column(name = "markVersion")
    public Integer getMarkVersion() {
        return markVersion;
    }

    public void setMarkVersion(Integer markVersion) {
        this.markVersion = markVersion;
    }

    @Column(name = "keyId")
    public String getKeyId() {
        return keyId;
    }

    public void setKeyId(String keyId) {
        this.keyId = keyId;
    }

    @Column(name = "keyName")
    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    @Column(name = "keyLength")
    public Integer getKeyLength() {
        return keyLength;
    }

    public void setKeyLength(Integer keyLength) {
        this.keyLength = keyLength;
    }

    @Column(name = "createTime")
    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    @Column(name = "createFrom")
    public Integer getCreateFrom() {
        return createFrom;
    }

    public void setCreateFrom(Integer createFrom) {
        this.createFrom = createFrom;
    }

    @Column(name = "enable")
    public Integer getEnable() {
        return enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

}
