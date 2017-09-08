package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * User generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true, dynamicInsert = true)
@Table(name = "UserMessageHistory", catalog = "dcms_db")
public class UserMessageHistory implements java.io.Serializable {

    private Integer id;
    private String fkUid;
    private String message;
    private String msgType;
    private String url;
    private Long createTime;

    public UserMessageHistory() {
    }

    public UserMessageHistory(String fkUid, String message, String msgType, String url, Long createTime) {
        super();
        this.fkUid = fkUid;
        this.message = message;
        this.msgType = msgType;
        this.url = url;
        this.createTime = createTime;
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

    @Column(name = "fkUid", length = 256)
    public String getFkUid() {
        return fkUid;
    }

    public void setFkUid(String fkUid) {
        this.fkUid = fkUid;
    }

    @Column(name = "message", length = 256, columnDefinition = "")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Column(name = "msgType", length = 256, columnDefinition = "")
    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }

    @Column(name = "url", length = 256, columnDefinition = "")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Column(name = "createTime")
    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

}
