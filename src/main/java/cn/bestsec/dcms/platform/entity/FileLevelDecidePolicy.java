package cn.bestsec.dcms.platform.entity;
// Generated 2017-3-22 10:33:46 by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * FileLevelDecidePolicy generated by hbm2java
 */
@Entity
@org.hibernate.annotations.Entity(dynamicUpdate=true,dynamicInsert=true)  
@Table(name = "FileLevelDecidePolicy", catalog = "dcms_db")
public class FileLevelDecidePolicy implements java.io.Serializable {

    private Integer id;
    private Integer fileState;
    private Integer fileLevel;
    private Integer roleType;
    private Integer contentRead;
    private Integer contentPrint;
    private Integer contentPrintHideWater;
    private Integer contentModify;
    private Integer contentScreenShot;
    private Integer contentCopy;
    private Integer fileCopy;
    private Integer fileSaveCopy;
    private Integer fileAuthorization;
    private Integer fileLevelDecide;
    private Integer fileLevelChange;
    private Integer fileDispatch;
    private Integer fileDecrypt;
    private Integer fileUnbunding;

    public FileLevelDecidePolicy() {
    }

    public FileLevelDecidePolicy(Integer fileState, Integer fileLevel, Integer roleType, Integer contentRead,
            Integer contentPrint, Integer contentPrintHideWater, Integer contentModify, Integer contentScreenShot,
            Integer contentCopy, Integer fileCopy, Integer fileSaveCopy, Integer fileAuthorization,
            Integer fileLevelDecide, Integer fileLevelChange, Integer fileDispatch, Integer fileDecrypt,
            Integer fileUnbunding) {
        this.fileState = fileState;
        this.fileLevel = fileLevel;
        this.roleType = roleType;
        this.contentRead = contentRead;
        this.contentPrint = contentPrint;
        this.contentPrintHideWater = contentPrintHideWater;
        this.contentModify = contentModify;
        this.contentScreenShot = contentScreenShot;
        this.contentCopy = contentCopy;
        this.fileCopy = fileCopy;
        this.fileSaveCopy = fileSaveCopy;
        this.fileAuthorization = fileAuthorization;
        this.fileLevelDecide = fileLevelDecide;
        this.fileLevelChange = fileLevelChange;
        this.fileDispatch = fileDispatch;
        this.fileDecrypt = fileDecrypt;
        this.fileUnbunding = fileUnbunding;
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

    @Column(name = "fileState")
    public Integer getFileState() {
        return this.fileState;
    }

    public void setFileState(Integer fileState) {
        this.fileState = fileState;
    }

    @Column(name = "fileLevel")
    public Integer getFileLevel() {
        return this.fileLevel;
    }

    public void setFileLevel(Integer fileLevel) {
        this.fileLevel = fileLevel;
    }

    @Column(name = "roleType")
    public Integer getRoleType() {
        return this.roleType;
    }

    public void setRoleType(Integer roleType) {
        this.roleType = roleType;
    }

    @Column(name = "contentRead")
    public Integer getContentRead() {
        return this.contentRead;
    }

    public void setContentRead(Integer contentRead) {
        this.contentRead = contentRead;
    }

    @Column(name = "contentPrint")
    public Integer getContentPrint() {
        return this.contentPrint;
    }

    public void setContentPrint(Integer contentPrint) {
        this.contentPrint = contentPrint;
    }

    @Column(name = "contentPrintHideWater")
    public Integer getContentPrintHideWater() {
        return this.contentPrintHideWater;
    }

    public void setContentPrintHideWater(Integer contentPrintHideWater) {
        this.contentPrintHideWater = contentPrintHideWater;
    }

    @Column(name = "contentModify")
    public Integer getContentModify() {
        return this.contentModify;
    }

    public void setContentModify(Integer contentModify) {
        this.contentModify = contentModify;
    }

    @Column(name = "contentScreenShot")
    public Integer getContentScreenShot() {
        return this.contentScreenShot;
    }

    public void setContentScreenShot(Integer contentScreenShot) {
        this.contentScreenShot = contentScreenShot;
    }

    @Column(name = "contentCopy")
    public Integer getContentCopy() {
        return this.contentCopy;
    }

    public void setContentCopy(Integer contentCopy) {
        this.contentCopy = contentCopy;
    }

    @Column(name = "fileCopy")
    public Integer getFileCopy() {
        return this.fileCopy;
    }

    public void setFileCopy(Integer fileCopy) {
        this.fileCopy = fileCopy;
    }

    @Column(name = "fileSaveCopy")
    public Integer getFileSaveCopy() {
        return this.fileSaveCopy;
    }

    public void setFileSaveCopy(Integer fileSaveCopy) {
        this.fileSaveCopy = fileSaveCopy;
    }

    @Column(name = "fileAuthorization")
    public Integer getFileAuthorization() {
        return this.fileAuthorization;
    }

    public void setFileAuthorization(Integer fileAuthorization) {
        this.fileAuthorization = fileAuthorization;
    }

    @Column(name = "fileLevelDecide")
    public Integer getFileLevelDecide() {
        return this.fileLevelDecide;
    }

    public void setFileLevelDecide(Integer fileLevelDecide) {
        this.fileLevelDecide = fileLevelDecide;
    }

    @Column(name = "fileLevelChange")
    public Integer getFileLevelChange() {
        return this.fileLevelChange;
    }

    public void setFileLevelChange(Integer fileLevelChange) {
        this.fileLevelChange = fileLevelChange;
    }

    @Column(name = "fileDispatch")
    public Integer getFileDispatch() {
        return this.fileDispatch;
    }

    public void setFileDispatch(Integer fileDispatch) {
        this.fileDispatch = fileDispatch;
    }

    @Column(name = "fileDecrypt")
    public Integer getFileDecrypt() {
        return this.fileDecrypt;
    }

    public void setFileDecrypt(Integer fileDecrypt) {
        this.fileDecrypt = fileDecrypt;
    }

    @Column(name = "fileUnbunding")
    public Integer getFileUnbunding() {
        return this.fileUnbunding;
    }

    public void setFileUnbunding(Integer fileUnbunding) {
        this.fileUnbunding = fileUnbunding;
    }

}
