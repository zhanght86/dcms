package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ClientLevelAccessPolicy generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "ClientLevelAccessPolicy", catalog = "dcms_db")
public class ClientLevelAccessPolicy implements java.io.Serializable {

    private Integer id;
    private Integer userLevel;
    private Integer clientLevel;
    private Integer enable;

    public ClientLevelAccessPolicy() {
    }

    public ClientLevelAccessPolicy(Integer userLevel, Integer clientLevel, Integer enable) {
        this.userLevel = userLevel;
        this.clientLevel = clientLevel;
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

    @Column(name = "userLevel")
    public Integer getUserLevel() {
        return this.userLevel;
    }

    public void setUserLevel(Integer userLevel) {
        this.userLevel = userLevel;
    }

    @Column(name = "clientLevel")
    public Integer getClientLevel() {
        return this.clientLevel;
    }

    public void setClientLevel(Integer clientLevel) {
        this.clientLevel = clientLevel;
    }

    @Column(name = "enable")
    public Integer getEnable() {
        return this.enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

}
