package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * RiskLevelPolicy generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "RiskLevelPolicy", catalog = "dcms_db")
public class RiskLevelPolicy implements java.io.Serializable {

    private Integer id;
    private String operateType;
    private Integer riskLevel;

    public RiskLevelPolicy() {
    }

    public RiskLevelPolicy(String operateType, Integer riskLevel) {
        this.operateType = operateType;
        this.riskLevel = riskLevel;
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

    @Column(name = "operateType", length = 256, columnDefinition = "")
    public String getOperateType() {
        return this.operateType;
    }

    public void setOperateType(String operateType) {
        this.operateType = operateType;
    }

    @Column(name = "riskLevel")
    public Integer getRiskLevel() {
        return this.riskLevel;
    }

    public void setRiskLevel(Integer riskLevel) {
        this.riskLevel = riskLevel;
    }

}
