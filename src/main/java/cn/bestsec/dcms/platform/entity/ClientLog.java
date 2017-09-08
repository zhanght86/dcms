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
 * ClientLog generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true, dynamicInsert = true)
@Table(name = "ClientLog", catalog = "dcms_db")
public class ClientLog implements java.io.Serializable {

    private Integer id;
    private Client client;
    private File fileByFkSrcFid;
    private User user;
    private Long createTime;
    private String ip;
    private String reserve;
    private String operateType;
    private String operateDescription;
    private Integer operateResult;
    private String operateWay;
    private String srcName;
    private String desName;

    public ClientLog() {
    }

    public ClientLog(Client client, File fileByFkSrcFid, User user, Long createTime, String ip, String reserve,
            String operateType, String operateDescription, Integer operateResult, String operateWay, String srcName,
            String desName) {
        this.client = client;
        this.fileByFkSrcFid = fileByFkSrcFid;
        this.user = user;
        this.createTime = createTime;
        this.ip = ip;
        this.reserve = reserve;
        this.operateType = operateType;
        this.operateDescription = operateDescription;
        this.operateResult = operateResult;
        this.operateWay = operateWay;
        this.srcName = srcName;
        this.desName = desName;
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
    @JoinColumn(name = "fkCid")
    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkSrcFid")
    public File getFileByFkSrcFid() {
        return this.fileByFkSrcFid;
    }

    public void setFileByFkSrcFid(File fileByFkSrcFid) {
        this.fileByFkSrcFid = fileByFkSrcFid;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkUid")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "createTime")
    public Long getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    @Column(name = "ip", length = 256, columnDefinition = "")
    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Column(name = "reserve", length = 256, columnDefinition = "")
    public String getReserve() {
        return this.reserve;
    }

    public void setReserve(String reserve) {
        this.reserve = reserve;
    }

    @Column(name = "operateType", length = 256, columnDefinition = "")
    public String getOperateType() {
        return this.operateType;
    }

    public void setOperateType(String operateType) {
        this.operateType = operateType;
    }

    @Column(name = "operateDescription", length = 256, columnDefinition = "")
    public String getOperateDescription() {
        return this.operateDescription;
    }

    public void setOperateDescription(String operateDescription) {
        this.operateDescription = operateDescription;
    }

    @Column(name = "operateResult")
    public Integer getOperateResult() {
        return this.operateResult;
    }

    public void setOperateResult(Integer operateResult) {
        this.operateResult = operateResult;
    }

    @Column(name = "operateWay", length = 256, columnDefinition = "")
    public String getOperateWay() {
        return this.operateWay;
    }

    public void setOperateWay(String operateWay) {
        this.operateWay = operateWay;
    }

    @Column(name = "srcName")
    public String getSrcName() {
        return srcName;
    }

    public void setSrcName(String srcName) {
        this.srcName = srcName;
    }

    @Column(name = "desName")
    public String getDesName() {
        return desName;
    }

    public void setDesName(String desName) {
        this.desName = desName;
    }

}
