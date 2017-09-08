package cn.bestsec.dcms.platform.api.model;


/**
 * 自动生成的API请求/响应Model类，不要手动修改
 */
public class UserSimpleInfo {
    private String uid;
    private String account;
    private String name;
    private Integer level;
    private Integer online;
    
    public UserSimpleInfo() {
    }

    public UserSimpleInfo(String uid, String account, String name, Integer level, Integer online) {
        this.uid = uid;
        this.account = account;
        this.name = name;
        this.level = level;
        this.online = online;
    }

    /**
     * 用户ID
     */
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    /**
     * 登录名
     */
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    /**
     * 姓名
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * 密级 1一般 2重要 3核心
     */
    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    /**
     * 在线状态 1在线 2离线
     */
    public Integer getOnline() {
        return online;
    }

    public void setOnline(Integer online) {
        this.online = online;
    }
}
