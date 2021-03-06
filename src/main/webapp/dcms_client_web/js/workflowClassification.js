var host = window.location.protocol + "//" + window.location.host;
// var host = "http://192.168.0.4:8080";
var token = "";

var workflowType;
var clientData;
var multiName = "";
var drafter = {
    "personId": 0,
    "personName": ""
};
var classificationAuthority = {
    "personId": 0,
    "personName": ""
};
var issuer = {
    "personId": 0,
    "personName": ""
};
var draftTime = new Date().getTime();
var classifiedTime = new Date().getTime();
var issuedTime = new Date().getTime();
var classificationOrganizationMajorId;
var classificationOrganizationMajor;
var accessScopeMap = new Mymap();
var accessScopeMapTmp = new Mymap();
var preDurationType;

var analysisId = 0;
var analysisLayerDisp = 1; //1显示，0隐藏

$(function () {
    initListner();
    // initSampleData(0);
    initData();
    installData();
});

// 样例初始数据
function initSampleData(little) {
    if (little == 1) {
        clientData = {
            "filename": "2222222.XLS",
            "urgency": 1,
            "uid": 29848984,
            "userName": "巴达",
            "token": "222222",
            "classificationIdentifier": "b332521452b332521452b33252145221"
        };
    } else {
        clientData = {
            "filename": "111111.XLS",
            "urgency": 0,
            "uid": 29848984,
            "userName": "巴达",
            "token": "222222",
            "classificationIdentifier": "c21252145",
            "issueNumber": "",
            "docNumber": 0,
            "duplicationAmount": 0,
            "operationControl": {
                "copyPolicy": 0,
                "pastePolicy": 0,
                "printPolicy": 1,
                "printHideWaterPolicy": 0,
                "modifyPolicy": 1,
                "screenShotPolicy": 1,
                "savePolicy": 0,
                "readPolicy": 1
            },
            "version": 1,
            "classificationLevel": 0,
            "classificationDuration": {
                "classifiedTime": 0,
                "longterm": 0,
                "classificationPeriod": "",
                "declassifiedTime": 0,
                "durationDescription": ""
            },
            "drafter": {
                "personId": 29848984,
                "personName": "巴达"
            },
            "classificationAuthority": {
                "personId": 9813046,
                "personName": "刘晓军"
            },
            "issuer": {
                "personId": 0,
                "personName": ""
            },
            "classificationOrganizationMajor": {
                "organizationID": 10001,
                "organizationName": "北京xxx集团公司"
            },
            "classificationOrganizationMinor": [
                {
                    "organizationID": 10002,
                    "organizationName": "辅助定密单位2"
                },
                {
                    "organizationID": 10003,
                    "organizationName": "辅助定密单位3"
                }
            ],
            "accessDescription": "",
            "accessScope": [
                {
                    "organizationID": 10001,
                    "userID": 10497356
                },
                {
                    "organizationID": 10001,
                    "userID": 5604542
                },
                {
                    "organizationID": 10002,
                    "userID": 2249249
                }
            ],
            "basisType": 0,
            "basisDescription": [
                {
                    "basisLevel": 1,
                    "basisContent": "11"
                },
                {
                    "basisLevel": 1,
                    "basisContent": "2222"
                }
            ],
            "classificationStatus": 1,
            "classificationHistory": [
                {
                    "time": 1492147422000,
                    "userID": 29848984,
                    "historyType": 1,
                    "classificationLevelBefore": 0,
                    "historyDescription": "111",
                    "durationBefore": {
                        "classifiedTime": 1492147422000,
                        "longterm": 1,
                        "classificationPeriod": "300000",
                        "declassifiedTime": 0,
                        "durationDescription": ""
                    }
                }
            ]
        };
    }
    multiName = "111111.XLS" + " | " + "222222.XLS";
}

function loadRemoteData() {
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/file/queryById",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        crossDomain: false,
        async: false,
        data: JSON.stringify({
            "token": token,
            "fid": clientData.classificationIdentifier
        }),
        success: function (data) {
            if (data.code == 0) {
                // 装填起草日期
                if ($("#id_draftTime").length > 0) {
                    $("#id_draftTime").val(parseTimestampToStr(data.fileCreateTime));
                }
                // 装填定密日期
                if ($("#id_classifiedTime").length > 0) {
                    $("#id_classifiedTime").val(parseTimestampToStr(data.fileLevelDecideTime));
                }
                // 装填签发日期
                if ($("#id_issuedTime").length > 0) {
                    $("#id_issuedTime").val(parseTimestampToStr(data.fileDispatchTime));
                }
                // 装填业务属性
                if ($("#id_business").length > 0) {
                    $("#id_business").val(data.business);
                }
                // 覆盖初始定密依据
                if ($("#id_basisDescription").length > 0) {
                    clientData.basisDescription = data.basis;
                }
            }
        },
        error: function (data) {
        }
    });
}

function initData() {
    var ocx = document.getElementById("ocx");
    var json = ocx.initFileHeader();
    // alert("初始数据：" + json);
    var org = JSON.parse(json);
    if (org != null && org.length > 0) {
        clientData = org[0];
        for (var i = 0; i < org.length; i++) {
            if (i > 0) {
                multiName += " | ";
            }
            multiName += org[i].filename;
        }
    }
}

function installData() {
    token = clientData.token;
    workflowType = $("#id_workflowType").val();
    loadRemoteData();

    // 装填文件名
    if ($("#id_filename").length > 0 && !isEmptyString(multiName)) {
        $("#id_filename").val(multiName);
    }
    // 装填紧急程度
    if ($("#id_urgency").length > 0 && clientData.urgency != null) {
        $("#id_urgency option[value='" + clientData.urgency + "']").attr("selected", true);
    }
    // 装填文号
    if ($("#id_issueNumber").length > 0 && !isEmptyString(clientData.issueNumber)) {
        $("#id_issueNumber").val(clientData.issueNumber);
    }
    // 装填份号
    if ($("#id_docNumber").length > 0 && clientData.docNumber != null) {
        $("#id_docNumber").val(clientData.docNumber);
    }
    // 装填份数
    if ($("#id_duplicationAmount").length > 0 && clientData.duplicationAmount != null) {
        $("#id_duplicationAmount").val(clientData.duplicationAmount);
    }
    // 装填秘密等级
    if ($("#id_fileLevel").length > 0 && clientData.classificationLevel != null) {
        $("#id_fileLevel option[value='" + clientData.classificationLevel + "']").attr("selected", true);
    }
    // 装填保密期限
    if ($("#id_durationType").length > 0 && clientData.classificationDuration != null) {
        var duration = clientData.classificationDuration;
        var durationType = 0;
        if (duration.longterm == 1) {
            durationType = 1;
        } else if (!isEmptyString(duration.classificationPeriod)) {
            durationType = 2;
        } else if (duration.declassifiedTime != null && duration.declassifiedTime != 0) {
            durationType = 3;
        } else if (!isEmptyString(duration.durationDescription)) {
            durationType = 4;
        }
        preDurationType = durationType;
        $("#id_durationType option[value='" + durationType + "']").attr("selected", true);
        installDurationUi(durationType);

        if (durationType == 2) {
            installDurationPeriod(duration.classificationPeriod);
        } else if (durationType == 3) {
            if (duration.declassifiedTime != null) {
                $("#id_declassifiedTime").val(parseTimestampToStr(duration.declassifiedTime))
            }
        } else if (durationType == 4) {
            if (!isEmptyString(duration.durationDescription)) {
                $("#id_durationDescription").val(duration.durationDescription);
            }
        }
        // 密文还原时，保密期限disable
        if (workflowType == 9) {
            if ($("#id_periodNum").length > 0) {
                $("#id_periodNum").attr("disabled", true);
            }
            if ($("#id_periodType").length > 0) {
                $("#id_periodType").attr("disabled", true);
            }
            if ($("#id_declassifiedTime").length > 0) {
                $("#id_declassifiedTime").attr("disabled", true);
            }
            if ($("#id_durationDescription").length > 0) {
                $("#id_durationDescription").attr("disabled", true);
            }
        }
    }
    // 装填控制权限
    if ($("#id_operationControl").length > 0) {
        if (clientData.operationControl != null) {
            installOperationControl("contentRead", clientData.operationControl.readPolicy);
            installOperationControl("contentPrint", clientData.operationControl.printPolicy);
            installOperationControl("contentPrintHideWater", clientData.operationControl.printHideWaterPolicy);
            installOperationControl("contentModify", clientData.operationControl.modifyPolicy);
            installOperationControl("contentScreenShot", clientData.operationControl.screenShotPolicy);
            installOperationControl("contentCopy", clientData.operationControl.pastePolicy);
            installOperationControl("fileCopy", clientData.operationControl.copyPolicy);
            installOperationControl("fileSaveCopy", clientData.operationControl.savePolicy);
        }
    }

    // 装填起草人
    if (clientData.drafter != null) {
        drafter = clientData.drafter;
    }
    if ($("#id_drafter").length > 0) {
        $("#id_drafter").val(drafter.personName);
    }

    // 装填定密责任人
    if (clientData.classificationAuthority != null) {
        classificationAuthority = clientData.classificationAuthority;
    }
    if ($("#id_classificationAuthority").length > 0) {
        $("#id_classificationAuthority").val(classificationAuthority.personName);
    }

    // 装填文件签发人
    if (clientData.issuer != null) {
        issuer = clientData.issuer;
    }
    if ($("#id_issuer").length > 0) {
        $("#id_issuer").val(issuer.personName);
    }

    // 装填定密日期
    if (clientData.classificationDuration != null) {
        classifiedTime = clientData.classificationDuration.classifiedTime;
    }
    if ($("#id_classifiedTime").length > 0) {
        $("#id_classifiedTime").val(parseTimestampToStr(classifiedTime));
    }

    // 装填签发日期
    if ($("#id_issuedTime").length > 0) {
        $("#id_issuedTime").val(parseTimestampToStr(issuedTime));
    }

    // 装填定密单位
    installDefaultClassificationOrganizationMajor();
    if (clientData.classificationOrganizationMajor != null && !isEmptyString(classificationOrganizationMajor.organizationName)) {
        classificationOrganizationMajor = clientData.classificationOrganizationMajor;
    }
    if ($("#id_classificationOrganizationMajor").length > 0) {
        $("#id_classificationOrganizationMajor").val(classificationOrganizationMajor.organizationName);
    }
    if ($("#id_classificationOrganizationMinors").length > 0) {
        if (clientData.classificationOrganizationMinor != null) {
            var str = "";
            for (var i = 0; i < clientData.classificationOrganizationMinor.length; i++) {
                if (i > 0) {
                    str += "\r\n";
                }
                str += "[" + clientData.classificationOrganizationMinor[i].organizationID + "]" + clientData.classificationOrganizationMinor[i].organizationName;
            }
            $("#id_classificationOrganizationMinors").val(str);
        }
        loadClassificationOrganizitionMinors();
    }

    // 装填定密依据
    if ($("#id_basisType").length > 0 && clientData.basisType != null) {
        $("#id_basisType option[value='" + clientData.basisType + "']").attr("selected", true);
    }
    if ($("#id_basisDescription").length > 0) {
        // 加载树结构
        loadBasisTree();
        if (clientData.basisDescription != null) {
            var str = "";
            for (var i = 0; i < clientData.basisDescription.length; i++) {
                if (i > 0) {
                    str += "\r\n";
                }
                str += "[" + parseLevelToName(clientData.basisDescription[i].basisLevel) + "]" + clientData.basisDescription[i].basisContent;
            }
            $("#id_basisDescription").val(str);
        }
    }

    // 装填知悉范围
    if ($("#id_accessScope").length > 0) {
        // 加载树结构
        loadScopeTree();
        if (clientData.accessScope != null) {
            // 预装勾选状态
            for (var i = 0; i < clientData.accessScope.length; i++) {
                var userNode = clientData.accessScope[i];
                if (userNode.organizationID == classificationOrganizationMajorId) {
                    checkAccessScopeTreeNode(userNode.userID);
                }
            }
            accessScopeMap = accessScopeMapTmp.copy();
            syncAccessScopePanel();
        }
    }
    if ($("#id_accessDescription").length > 0 && !isEmptyString(clientData.accessDescription)) {
        $("#id_accessDescription").val(clientData.accessDescription);
    }

    if ($("#id_business").length > 0) {
        // 加载树结构
        loadBusinessTree();
    }

    // 装填审批人列表
    if ($("#id_approver").length > 0) {
        loadApprovers();
    }
}

function initListner() {
    $("#id_fileLevel").change(function () {
        onFileLevelChange();
    });

    $("#id_durationType").change(function () {
        onDurationTypeChange();
    });

    $("#id_accessScope").click(function () {
        delete accessScopeMapTmp;
        accessScopeMapTmp = accessScopeMap.copy();
        layer.open({
            type: 1,
            title: "知悉范围",
            area: ['400px', '500px'],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
                accessScopeMap = accessScopeMapTmp.copy();
                delete accessScopeMapTmp;
                syncAccessScopePanel();
                layer.close(index);
            },
            no: function () {
                delete accessScopeMapTmp;
            },
            content: $("#id_layerScopeTree") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
    });

    $("#id_classificationOrganizationMinors").click(function () {
        var classificationOrganizationMinors = new Array();
        var minorsText = $("#id_classificationOrganizationMinors").val();
        if (!isEmptyString(minorsText)) {
            var minorArr = minorsText.split("\r\n");
            for (var index in minorArr) {
                var item = minorArr[index];
                if (item.indexOf("[") < 0 || item.indexOf("]") < 0) {
                    continue;
                }
                var organizationID = item.slice(item.indexOf("[") + 1, item.indexOf("]"));
                var organizationName = item.slice(item.indexOf("]") + 1);
                classificationOrganizationMinors.push({
                    "organizationID": parseInt(organizationID),
                    "organizationName": organizationName
                });
            }
        }
        if (classificationOrganizationMinors.length > 0) {
            var str = "";
            for (var i = 0; i < classificationOrganizationMinors.length; i++) {
                if (i > 0) {
                    str += "\r\n";
                }
                str += "[" + classificationOrganizationMinors[i].organizationID + "]" + classificationOrganizationMinors[i].organizationName;
                $("#id_unitNo" + classificationOrganizationMinors[i].organizationID + " input").attr("checked", true);
            }
            $("#id_classificationOrganizationMinors").empty();
            $("#id_classificationOrganizationMinors").val(str);
        }
        layer.open({
            type: 1,
            title: "辅助定密单位",
            area: ['300px', '300px'],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
                $("#id_classificationOrganizationMinors").empty();
                var str = "";
                $("#id_minors :checkbox:checked").each(function (index, element) {
                    if (index > 0) {
                        str += "\r\n";
                    }
                    str += $(this).parent().text();
                });
                $("#id_classificationOrganizationMinors").val(str);
                layer.close(index);
            },
            content: $("#id_layerMinors") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
    });

    $("#id_basisType").change(function () {
        loadBasisTree();
        // 切换依据类型后，需要清空数据
        $("#id_basisDescription").empty();
        // 如果切换回初始类型，重新预装初始数据
        if (clientData.basisDescription != null && parseInt($("#id_basisType option:selected").val()) == clientData.basisType) {
            var str = "";
            for (var i = 0; i < clientData.basisDescription.length; i++) {
                if (i > 0) {
                    str += "\r\n";
                }
                str += "[" + parseLevelToName(clientData.basisDescription[i].basisLevel) + "]" + clientData.basisDescription[i].basisContent;
            }
            $("#id_basisDescription").val(str);
        }
    });

    $("#id_basisDescription").click(function () {
        $("#id_basisTree :checkbox:checked").attr("checked", false);
        layer.open({
            type: 1,
            title: "添加定密依据",
            area: ['400px', '500px'],
            btn: ["添加", "关闭"],
            yes: function (index, layero) {
                $("#id_basisTree input:checkbox:checked").each(function (index, element) {
                    var str = $("#id_basisDescription").val();
                    var content = $(this).parent().text();
                    var desc = content.slice(0, 4) + "《" + $(this).val() + "》" + content.slice(4);
                    if (str.indexOf(desc) < 0) {
                        // 判断无重复，则追加
                        if (str != "") {
                            str += "\r\n";
                        }
                        str += desc;
                    }
                    $("#id_basisDescription").val(str);
                });
                layer.close(index);
            },
            no: function () {
            },
            content: $("#id_layerBasisTree") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
    });

    $("#id_business").click(function () {
        layer.open({
            type: 1,
            title: "选择业务属性",
            area: ['400px', '500px'],
            btn: ["关闭"],
            yes: function (index, layero) {
                layer.close(index);
            },
            content: $("#id_layerBusinessTree") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
    });

    $("#id_commit").click(function () {
        commit();
    });
    
    $("#id_analysis").click(function () {
        layer.open({
            type: 1,
            title: "密点分析",
            area: ['800px', '500px'],
            btn: ["关闭"],
            yes: function (index, layero) {
                analysisLayerDisp = 0;
                layer.close(index);
            },
            content: $("#id_layerAnalysis") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
        analysisLayerDisp = 1;
        var ocx = document.getElementById("ocx");
        if (analysisId == 0 && ocx != null && ocx.commitAnalysis != null) {
            analysisId = genFid();
            ocx.commitAnalysis(JSON.stringify({
                "token": token,
                "analysisId": analysisId,
                "fid": clientData.classificationIdentifier
            }));
        }
    });

    $("#id_commitAnalysis").click(function () {
        if (analysisId == 0 && !isEmptyString($("#id_fileSelect").val())) {
            analysisId = genFid();
            commitAnalysis();
            setTimeout('queryAnalysis()', 1000);
        } else {
            queryAnalysis();
        }
    });
}

function contentAppendHighLigt(src, keyword) {
    return src.replace(new RegExp(keyword, "gm"), "<B style='color:black;background-color:#ffff66'>" + keyword + "</B>");
}

function queryAnalysis() {
    if (analysisLayerDisp == 0 || analysisId == 0) {
        return;
    }
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/file/queryAnalysis",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        crossDomain: false,
        async: false,
        data: JSON.stringify({
            "token": token,
            "analysisId": analysisId
        }),
        success: function (data) {
            $("#id_layerAnalysis_tbody").empty();
            if (data.code == 0) {
                $("#id_layerAnalysis_description").text(data.description);
                if (data.execState != 2 && data.execState != 3) {
                    setTimeout('queryAnalysis()', 2000);
                    return;
                }
                if (data.keywordResultList != null) {
                    for (var i = 0; i < data.keywordResultList.length; i++) {
                        var item = data.keywordResultList[i];
                        var content = item.content;
                        for (var j = 0; j < content.length; j++) {
                            var str;
                            var ct = "..." + contentAppendHighLigt(content[j], item.keyword) + "...";
                            if (j == 0) {
                                str = '<tr>' +
                                    '<td rowspan="' + item.hitCount + '">' + item.keyword + '</td>' +
                                    '<td rowspan="' + item.hitCount + '">' + item.level + '</td>' +
                                    '<td rowspan="' + item.hitCount + '">' + item.hitCount + '</td>' +
                                    '<td>' + ct + '</td>' +
                                    '</tr>';
                            } else {
                                str = '<tr>' +
                                    '<td>' + ct + '</td>' +
                                    '</tr>';
                            }
                            $("#id_layerAnalysis_tbody").append(str);
                            $("#id_layerAnalysis_tbody td").each(function () {
                                $(this).attr("title", $(this).text());
                            });
                        }
                    }
                }
            }
        },
        error: function (data) {
        }
    });
}

function commitAnalysis() {
    $("input[name='body']").val(JSON.stringify({
        "token": token,
        "analysisId": analysisId,
        "fid": clientData.classificationIdentifier
    }));
    var options = {
        url: host + '/dcms/api/v1/file/commitAnalysis',
        type: 'post',
        crossDomain: false,
        success: function (data) {
            if (data.code == 0) {
                period = data.validPeriod;
            }
        },
        error: function (data) {
        }
    };
    $("#id_layerAnalysis_form").ajaxSubmit(options);
}

function fileSelectChange() {
    var str = $("#id_fileSelect").val();
    var arr = str.split("\\");
    $("input[name='rfilename']").val(arr[arr.length - 1]);
}

// 秘密等级改变时调用
function onFileLevelChange() {
    // 当无初始期限数据并且类型为期限时，预装建议的期限值
    if ($("#id_durationType option:selected").val() == 2) {
        if (clientData.classificationDuration != null) {
            installDurationPeriod(clientData.classificationDuration.classificationPeriod);
        } else {
            installDurationPeriod();
        }
    }

    if ($("#id_approver").length > 0) {
        loadApprovers();
    }
}

// 保密期限类型改变时调用
function onDurationTypeChange() {
    installDurationUi($("#id_durationType option:selected").val());
    if ($("#id_durationType option:selected").val() == 2) {
        if (clientData.classificationDuration != null) {
            installDurationPeriod(clientData.classificationDuration.classificationPeriod);
        } else {
            installDurationPeriod();
        }
    } else if ($("#id_durationType option:selected").val() == 3 && clientData.classificationDuration != null) {
        if (clientData.classificationDuration.declassifiedTime != null) {
            $("#id_declassifiedTime").val(parseTimestampToStr(clientData.classificationDuration.declassifiedTime))
        }
    } else if ($("#id_durationType option:selected").val() == 4 && clientData.classificationDuration != null) {
        if (!isEmptyString(clientData.classificationDuration.durationDescription)) {
            $("#id_durationDescription").val(clientData.classificationDuration.durationDescription);
        }
    }
}

// 勾选/取消知悉范围树节点时调用
function onAccessScopeTreeNodeClick(id) {
    if ($("#" + id).is(':checked')) {
        checkAccessScopeTreeNode(id);
    } else {
        uncheckAccessScopeTreeNode(id);
    }
}

function onBusinessSelected(name) {
    $("#id_business").val(name);
    // 关闭layer
    // var index = layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    layer.closeAll();
}

function installDurationPeriod(period) {
    if (isEmptyString(period)) {
        $.ajax({
            type: "post",
            url: host + "/dcms/api/v1/securePolicy/queryValidPeriod",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            crossDomain: false,
            async: false,
            data: JSON.stringify({
                "token": token,
                "fileLevel": $("#id_fileLevel option:selected").val()
            }),
            success: function (data) {
                if (data.code == 0) {
                    period = data.validPeriod;
                }
            },
            error: function (data) {
            }
        });
    }
    if (!isEmptyString(period) && period.length == 6) {
        var time = period.split("");
        if (time[0] + time[1] != "00") {
            if (time[0] == "0") {
                $("#id_periodNum").val(time[1]);
            } else {
                $("#id_periodNum").val(time[0] + time[1]);
            }
            $("#id_periodType").find("option").eq(0).attr("selected", true);
        }
        if (time[2] + time[3] != "00") {
            if (time[2] == "0") {
                $("#id_periodNum").val(time[3]);
            } else {
                $("#id_periodNum").val(time[2] + time[3]);
            }
            $("#id_periodType").find("option").eq(1).attr("selected", true);
        }
        if (time[4] + time[5] != "00") {
            if (time[4] == "0") {
                $("#id_periodNum").val(time[5]);
            } else {
                $("#id_periodNum").val(time[4] + time[5]);
            }
            $("#id_periodType").find("option").eq(2).attr("selected", true);
        }
    } else {
        $("#id_periodNum").val(period);
    }
}

function installDurationUi(durationType) {
    var str = "";
    if (durationType == 2) {
        str = '<input type="text" id="id_periodNum" style="width: 60px;"><select id="id_periodType" style="display: inline-block;width: 60px;margin-left: 5px;"><option selected>年</option><option>月</option><option>日</option></select>';
    } else if (durationType == 3) {
        str = '<input style="display: inline-block;color:#000;padding: 0" type="text" class="laydate-icon" id="id_declassifiedTime" onclick="showLaydate()" >';
    } else if (durationType == 4) {
        str = '<textarea id="id_durationDescription" rows="1" style="resize:none;width: 520px;margin-top:10px;color: #000;height:25px;"></textarea>';
    }
    $("#id_duration").empty();
    $("#id_duration").append(str);
}

function installOperationControl(name, enable) {
    $("#id_operationControl input[name='" + name + "']").attr("checked", enable == 1 ? true : false);
}

function installDefaultOperationControlPolicy() {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "token": token,
            "fileState": 1,
            "fileLevel": $("#id_fileLevel option:selected").val(),
            "roleType": 4
        }),
        url: host + "/dcms/api/v1/securePolicy/queryPermissionPolicy",
        dataType: "json",
        cache: false,
        crossDomain: false,
        success: function (data) {
            if (data.code == 0) {
                var permissions = data.permission;
                if (permissions != null) {
                    installOperationControl("contentRead", permissions.contentRead);
                    installOperationControl("contentPrint", permissions.contentPrint);
                    installOperationControl("contentPrintHideWater", permissions.contentPrintHideWater);
                    installOperationControl("contentModify", permissions.contentModify);
                    installOperationControl("contentScreenShot", permissions.contentScreenShot);
                    installOperationControl("contentCopy", permissions.contentCopy);
                    installOperationControl("fileCopy", permissions.fileCopy);
                    installOperationControl("fileSaveCopy", permissions.fileSaveCopy);
                }
            }
        }
    });
}

function installDefaultClassificationOrganizationMajor() {
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/unit/queryMajorList",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        crossDomain: false,
        async: false,
        data: JSON.stringify({
            "token": token
        }),
        success: function (data) {
            if (data.code == 0) {
                classificationOrganizationMajor = {
                    "organizationID": data.unitNo,
                    "organizationName": data.name
                };
                classificationOrganizationMajorId = data.unitNo;
            }
        },
        error: function (data) {
        }
    });
}

function loadClassificationOrganizitionMinors() {
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/unit/queryMinorList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        crossDomain: false,
        data: JSON.stringify({
            "token": token,
            "pageNumber": 0,
            "pageSize": 10000
        }),
        success: function (result) {
            var dat = result.unitList;
            var str = '';
            for (var i = 0; i < dat.length; i++) {
                str += '<tr><td id="id_unitNo' + dat[i].unitNo + '"style="color: #000;"><input type="checkbox">[' + dat[i].unitNo + ']' + dat[i].name + '</td></tr>';
            }
            $("#id_minors").prepend(str);
        },
        error: function (result) {
        }
    });
}

function loadBasisTree() {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "token": token,
            "basisType": parseInt($("#id_basisType option:selected").val()),
            "basisLevel": 4
        }),
        url: host + "/dcms/api/v1/basis/queryBasisTree",
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: false,
        success: function (data) {
            if (data.code == 0) {
                var str = installBasisTreeClass(data);
                $("#id_basisTree").empty();
                $("#id_basisTree").append(str);
                $("#id_basisTree").treeview({
                    collapsed: true,
                    add: $("#id_basisTree").html
                });
            }
        }
    });
}

function installBasisTreeClass(data) {
    var str = "";
    for (var i = 0; i < data.basisClassList.length; i++) {
        var className = data.basisClassList[i].basisClass;
        str += '<ul id="id_basisTree" class="filetree treeview"><li><span class="folder" style="color: #000;" value="' + className + '">' + className + '</span>' + installBasisTreeBasis(data.basisClassList[i]) + '</li></ul>';
    }
    return str;
}

function installBasisTreeBasis(data) {
    var str = "";
    for (var i = 0; i < data.basisList.length; i++) {
        var basisName = data.basisList[i].basisName;
        var parentClassName = data.basisClass;
        str += '<ul id="id_basisTree" class="filetree treeview"><li><span class="folder" style="color: #000;" name="' + parentClassName + '" value="' + basisName + '">' + basisName + '</span>' + installBasisTreeItem(data.basisList[i]) + '</li></ul>';
    }
    return str;
}

function installBasisTreeItem(data) {
    var str = "";
    for (var i = 0; i < data.basisItemList.length; i++) {
        var basisId = data.basisItemList[i].basisId;
        var basisLevel = data.basisItemList[i].basisLevel;
        var basisItem = data.basisItemList[i].basisItem;
        var parentBasisName = data.basisName;
        var basisContent = "[" + parseLevelToName(basisLevel) + "]" + basisItem;
        str += '<ul id="id_basisTree" class="filetree treeview"><li><span class="file" style="color: #000;"><input type="checkbox" value="' + parentBasisName + '">' + basisContent + '</span></li></ul>';
    }
    return str;
}

function loadBusinessTree() {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "token": token
        }),
        url: host + "/dcms/api/v1/business/queryTree",
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: false,
        success: function (data) {
            if (data.code == 0 && data.bList != null) {
                var str = installBusinessTree(data);
                $("#id_businessTree").empty();
                $("#id_businessTree").append(str);
                $("#id_businessTree").treeview({
                    collapsed: true,
                    add: $("#id_businessTree").html
                });
            }
        }
    });
}

//审核人
function loadApprovers() {
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/workFlow/queryApproverSelectList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        crossDomain: false,
        data: JSON.stringify({
            "token": token,
            "workFlowType": workflowType,
            "applyFileLevel": parseInt($("#id_fileLevel option:selected").val()),
            "step": 1
        }),
        success: function (data) {
            if (data.code == 0 && data.stepList != null && data.stepList.length > 0) {
                for (var i = 0; i < data.stepList.length; i++) {
                    if (data.stepList[i].step == 1 && data.stepList[i].roleList.length > 0) {
                        var str = "";
                        str += '<span style="font-weight: bold; letter-spacing: 8px">审批人：</span>';
                        str += '<select>';
                        for (var j = 0; j < data.stepList[i].roleList.length; j++) {
                            str += '<option value="' + data.stepList[i].roleList[j].roleId + '">' + data.stepList[i].roleList[j].name + '</option>';
                        }
                        str += '</select>';
                        $("#id_approver").empty();
                        $("#id_approver").append(str);
                        return;
                    }
                }
            }
            $("#id_approver").empty()
            $("#id_approver").append('<span style="font-weight: bold; letter-spacing: 8px">审批人：</span><span style="font-weight: bold;">没有审核人请联系安全保密管理员</span>')
        },
        error: function (result) {
        }
    })
}

function installBusinessTree(data) {
    var str = "";
    for (var i = 0; i < data.bList.length; i++) {
        var bId = data.bList[i].bId;
        var name = data.bList[i].name;
        var childs = data.bList[i];
        str += '<ul id="id_businessTree" class="filetree treeview"><li><span class="file" style="color: #000; cursor:pointer" name="' + bId + '" value="' + name + '" onclick="onBusinessSelected(this.value)">' + name + '</span>' + installBusinessTree(childs) + '</li></ul>';
    }
    return str;
}

function showLaydate() {
    laydate({
        elem: '#id_declassifiedTime',
        format: 'YYYY/MM/DD ',
        start: laydate.now(0, 'YYYY/MM/DD'),
        //istime: true,
        istoday: true
    });
}

function addAccessScopeNode(organizationID, userID, userName) {
    var userNode = {
        "organizationID": organizationID,
        "userID": userID,
        "userName": userName
    };
    accessScopeMapTmp.put(organizationID + "_" + userID, userNode);
}

function deleteAccessScopeNode(organizationID, userID) {
    accessScopeMapTmp.remove(organizationID + "_" + userID);
}

function syncAccessScopePanel() {
    if ($("#id_accessScope").length > 0) {
        var str = "";
        var keys = accessScopeMap.keySet();
        for (var i = 0; i < keys.length; i++) {
            var node = accessScopeMap.get(keys[i]);
            if (i > 0) {
                str += ", ";
            }
            str += node.userName;
        }
        $("#id_accessScope").val(str);
    }
}

function checkAccessScopeTreeNode(id) {
    if (String(id).indexOf('did') == -1) {
        var userName = $("#id_scopeTree input[value='" + id + "']").parent().text();
        addAccessScopeNode(classificationOrganizationMajorId, id, userName);
    }
    // 勾选节点
    $("#id_scopeTree input[value='" + id + "']").attr("checked", true);
    // 如果子节点全部勾选，自动勾选父节点
    var parentId = $("#id_scopeTree input[value='" + id + "']").attr("name");
    if ($("input[name='" + parentId + "']").length == $("input[name='" + parentId + "']:checked").length) {
        checkParentNodes(parentId);
    }
    // 勾选所有子节点
    $("input[name=" + id + "]").each(function () {
        checkAccessScopeTreeNode($(this).val());
    });
}


function checkParentNodes(id){
	$("#id_scopeTree input[value='" + id + "']").attr("checked", true);
	// 如果子节点全部勾选，自动勾选父节点
	if (String(id).indexOf('did') != -1) {
		var parentId = $("#id_scopeTree input[value='" + id + "']").attr("name");
		if ($("input[name='" + parentId + "']").length == $("input[name='" + parentId + "']:checked").length) {
			checkParentNodes(parentId);
		}
	}
    
}

function uncheckAccessScopeTreeNode(id) {
    if (String(id).indexOf('did') == -1) {
        var userName = $("#id_scopeTree input[value='" + id + "']").parent().text();
        deleteAccessScopeNode(classificationOrganizationMajorId, id, userName);
    }
    // 取消勾选节点
    $("#id_scopeTree input[value='" + id + "']").attr("checked", false);
    // 自动取消勾选父节点
    var parentId = $("#id_scopeTree input[value='" + id + "']").attr("name");
    uncheckParentNodes(parentId);
    // 取消勾选所有子节点
    $("input[name=" + id + "]").each(function () {
        uncheckAccessScopeTreeNode($(this).val());
    });
}

function uncheckParentNodes(id){
	$("#id_scopeTree input[value='" + id + "']").attr("checked", false);
	if (String(id).indexOf('did') != -1) {
		var parentId = $("#id_scopeTree input[value='" + id + "']").attr("name");
		uncheckParentNodes(parentId);
	}
	
}

function loadScopeTree(s) {
    var a = new Array();
    var keyword = $("#id_treeKeyword").val();
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "token": token,
            "hasUser": 1,
            "hasGroup": 0,
            "fileLevel": "",
            "keyword": keyword == "" ? null : keyword//进入客户端容器“”值到后台会被转换成字符串“null”而不是null
        }),
        url: host + "/dcms/api/v1/department/queryTree",
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: false,
        success: function (data) {
            if (data.code == 0) {
                var str = '<ul id="id_scopeTree" class="filetree treeview"><li><span class="com" style="color: #000;"><input type="checkbox" onclick="onAccessScopeTreeNodeClick(this.id)" value=' + data.did + ' id="' + data.did + '">' + data.name + '</span>' + installScopeTree(data) + '</li></ul>';
                $("#id_scopeTree").empty();
                $("#id_scopeTree").append(str);
                $("#id_scopeTree").treeview({
                    collapsed: true,
                    add: $("#id_scopeTree").html
                });
            }
        }
    });
}

function installScopeTree(data) {
    var str = '';
    for (var i = 0; i < data.childUserList.length; i++) {
        str += '<ul><li><span class="user" style="color: #000;"><input type="checkbox" onclick="onAccessScopeTreeNodeClick(this.id)" id="' + data.childUserList[i].uid + '" name="' + data.did + '" value="' + data.childUserList[i].uid + '">' + data.childUserList[i].name + '</span></li></ul>';
    }
    for (var i = 0; i < data.childDepartmentList.length; i++) {
        str += '<ul><li><span class="dep" style="color: #000;"><input type="checkbox" onclick="onAccessScopeTreeNodeClick(this.id)" id="' + data.childDepartmentList[i].did + '" name="' + data.did + '" value="' + data.childDepartmentList[i].did + '">' + data.childDepartmentList[i].name + '</span>' + installScopeTree(data.childDepartmentList[i]) + '</li></ul>';
    }
    return str;
}

function genFid() {
    var fid = 0;
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "token": token
        }),
        url: host + "/dcms/api/v1/file/applyNewFid",
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: false,
        success: function (data) {
            if (data.code == 0) {
                fid = data.fid;
            }
        }
    });
    return fid;
}

function parseLevelToName(level) {
    if (level == null || level == 0) {
        return "公开";
    } else if (level == 1) {
        return "内部";
    } else if (level == 2) {
        return "秘密";
    } else if (level == 3) {
        return "机密";
    } else if (level == 4) {
        return "绝密";
    } else {
        return "公开";
    }
}

function parseTimestampToStr(timestamp) {
    if (timestamp == 0) {
        return "";
    }
    var oDate = new Date(timestamp);
    if (isNaN(oDate)) {
        return "";
    }
    oYear = oDate.getFullYear();
    oMonth = oDate.getMonth() + 1;
    oDay = oDate.getDate();
    oMonth = oMonth < 10 ? '0' + oMonth : oMonth;
    oDay = oDay < 10 ? '0' + oDay : oDay;
    oTime = oYear + '/' + oMonth + '/' + oDay;
    return oTime;
}

function isEmptyString(str) {
    if (str == null) {
        return true;
    }
    if (typeof(str) == "undefined") {
        return true;
    }
    if ($.trim(str) == "") {
        return true;
    }
    return false;
}

function isCheckedBox(t, values) {
    if (t.find("input[name=" + values + "]").is(':checked')) {
        return 1;
    } else {
        return 0;
    }
}

function commit() {
    var currentTime = new Date().getTime();
    // 份号
    var docNumber = parseInt($("#id_docNumber").val());
    if (docNumber == null || docNumber == 'undefined' || isNaN(docNumber)) {
        docNumber = 0;
    }
    // 份数
    var duplicationAmount = parseInt($("#id_duplicationAmount").val());
    if (duplicationAmount == null || duplicationAmount == 'undefined' || isNaN(duplicationAmount)) {
        duplicationAmount = 0;
    }
    // 标志版本
    var markVersion = 1;
    if (clientData.version != null) {
        markVersion = parseInt(clientData.version);
    }
    // 保密期限
    var durationType = $("#id_durationType option:selected").val();
    var classificationDuration;
    if (durationType == 0) {
        classificationDuration = {
            "longterm": 0,
            "classificationPeriod": "",
            "classifiedTime": classifiedTime,
            "declassifiedTime": 0,
            "durationDescription": ""
        }
    } else if (durationType == 1) {
        classificationDuration = {
            "longterm": 1,
            "classificationPeriod": "",
            "classifiedTime": classifiedTime,
            "declassifiedTime": 0,
            "durationDescription": ""
        }
    } else if (durationType == 2) {
        var periodNum = $("#id_periodNum").val();
        var period;

        var te = /^[1-9][0-9]?$/; // 1-99的数字
        if (!te.test(periodNum)) {
            layer.alert('请输入正确的保密期限（1-99的整数）', {
                icon: 1,
                skin: 'layer-ext-moon'
            });
            return;
        }
        if (periodNum.length == 1) {
            period = "0" + periodNum;
        } else {
            period = periodNum;
        }
        if ($("#id_periodType").find("option").eq(0).is(":selected")) {
            period = period + "0000";
        } else if ($("#id_periodType").find("option").eq(1).is(":selected")) {
            period = "00" + period + "00";
        } else if ($("#id_periodType").find("option").eq(2).is(":selected")) {
            period = "0000" + period;
        }
        classificationDuration = {
            "longterm": 0,
            "classificationPeriod": period,
            "classifiedTime": classifiedTime,
            "declassifiedTime": 0,
            "durationDescription": ""
        }
    } else if (durationType == 3) {
        var date = new Date($("#id_declassifiedTime").val());
        if (isNaN(date)) {
            layer.alert('请选择解密日期', {
                icon: 1,
                skin: 'layer-ext-moon'
            });
            return;
        }
        classificationDuration = {
            "longterm": 0,
            "classificationPeriod": period,
            "classifiedTime": classifiedTime,
            "declassifiedTime": date.getTime(),
            "durationDescription": ""
        }
    } else if (durationType == 4) {
        var durationDescription = $("#id_durationDescription").val();
        if (isEmptyString(durationDescription)) {
            layer.alert('解密条件不能为空', {
                icon: 1,
                skin: 'layer-ext-moon'
            });
            return;
        }
        classificationDuration = {
            "longterm": 0,
            "classificationPeriod": "",
            "classifiedTime": classifiedTime,
            "declassifiedTime": 0,
            "durationDescription": durationDescription
        }
    }
    // 辅助定密单位
    var classificationOrganizationMinors = new Array();
    var minorsText = $("#id_classificationOrganizationMinors").val();
    if (!isEmptyString(minorsText)) {
        var minorArr = minorsText.split("\r\n");
        for (var index in minorArr) {
            var item = minorArr[index];
            if (item.length > 3) {
                if (item.indexOf("[") < 0 || item.indexOf("]") < 0) {
                    layer.alert('辅助定密单位格式不正确！（[单位编号]单位名称）', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    });
                    return;
                }
                var organizationID = item.slice(item.indexOf("[") + 1, item.indexOf("]"));
                var organizationName = item.slice(item.indexOf("]") + 1);
                classificationOrganizationMinors.push({
                    "unitNo": parseInt(organizationID),
                    "name": organizationName
                });
            }
        }
    }

    // 知悉范围
    var accessScope = new Array();
    var keySet = accessScopeMap.keySet();
    for (var index in keySet) {
        var scope = accessScopeMap.get(keySet[index]);
        accessScope.push({
            "unitNo": parseInt(scope.organizationID),
            "uid": parseInt(scope.userID)
        });
    }

    //定密依据
    var basisDescription = new Array();
    var basisText = $("#id_basisDescription").val();
    if (!isEmptyString(basisText)) {
        var basisArr = basisText.split("\r\n");
        for (var index in basisArr) {
            var item = basisArr[index];
            if (item.length > 4) {
                var levelName = item.slice(1, 3);
                var content = item.slice(4);
                var level;
                if (levelName == "公开") {
                    level = 0;
                } else if (levelName == "内部") {
                    level = 1;
                } else if (levelName == "秘密") {
                    level = 2;
                } else if (levelName == "机密") {
                    level = 3;
                } else if (levelName == "绝密") {
                    level = 4;
                } else {
                    layer.alert('定密依据格式不正确！（[秘密]依据内容）', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    });
                    return;
                }
                basisDescription.push({
                    "basisLevel": level,
                    "basisContent": content
                });
            }
        }
    }

    //审批人
    var approverByStep = new Array()
    $("#id_approver option:selected").each(function () {
        approverByStep.push($(this).val())
    });
    if (approverByStep.length == 0) {
        layer.alert('未选择审批人，如果无法选择审批人请联系安全保密管理员', {
            icon: 1,
            skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
        });
        return;
    }

    // 申请理由
    var comment = $("#id_comment").val();
    if (isEmptyString(comment)) {
        layer.alert('申请理由不能为空', {
            icon: 1,
            skin: 'layer-ext-moon'
        });
        return;
    }

    var level = parseInt($("#id_fileLevel option:selected").val());
    if (level > 1) {
        if (durationType <= 1) {
            layer.alert('秘密等级为秘密、机密、绝密时，必须确定非长期保密期限', {
                icon: 1,
                skin: 'layer-ext-moon'
            });
            return;
        } else if (accessScope.length == 0 && isEmptyString($("#id_accessDescription").val())) {
            layer.alert('秘密等级为秘密、机密、绝密时，必须指定知悉范围', {
                icon: 1,
                skin: 'layer-ext-moon'
            });
            return;
        }
    }

    var preFileState = 0;
    if (clientData.classificationStatus == 1) {
        preFileState = 1;
    } else if (clientData.classificationStatus == 3) {
        preFileState = 2;
    } else if (clientData.classificationStatus == 7) {
        preFileState = 3;
    } else if (clientData.classificationStatus == 15) {
        preFileState = 5;
    }
    var uploadParam = {
        "token": token,
        "workFlowType": workflowType,
        "fileState": preFileState,
        "srcFid": clientData.classificationIdentifier,
        "applyFileLevel": parseInt($("#id_fileLevel option:selected").val()),
        "applyValidPeriod": classificationDuration.classificationPeriod,
        "durationType": durationType,
        "durationDescription": classificationDuration.durationDescription,
        "fileDecryptTime": classificationDuration.declassifiedTime,
        "fileScope": accessScope,
        "fileScopeDesc": isEmptyString($("#id_accessDescription").val()) ? "" : $("#id_accessDescription").val(),
        "applyBasis": basisDescription,
        "basisType": parseInt($("#id_basisType option:selected").val()),
        "issueNumber": isEmptyString($("#id_issueNumber").val()) ? "" : $("#id_issueNumber").val(),
        "docNumber": docNumber,
        "duplicationAmount": duplicationAmount,
        "applyMajorUnit": {
            "unitNo": parseInt(classificationOrganizationMajor.organizationID),
            "name": classificationOrganizationMajor.organizationName
        },
        "applyMinorUnit": classificationOrganizationMinors,
        "createComment": comment,
        "approverByStep": approverByStep,
        "permission": {
            "contentRead": isCheckedBox($("#id_operationControl"), "contentRead"),
            "contentPrint": isCheckedBox($("#id_operationControl"), "contentPrint"),
            "contentPrintHideWater": isCheckedBox($("#id_operationControl"), "contentPrintHideWater"),
            "contentModify": isCheckedBox($("#id_operationControl"), "contentModify"),
            "contentScreenShot": isCheckedBox($("#id_operationControl"), "contentScreenShot"),
            "contentCopy": isCheckedBox($("#id_operationControl"), "contentCopy"),
            "fileCopy": isCheckedBox($("#id_operationControl"), "fileCopy"),
            "fileSaveCopy": isCheckedBox($("#id_operationControl"), "fileSaveCopy")
        },
        "filename": clientData.filename,
        "markVersion": markVersion,
        "urgency": $("#id_urgency option:selected").val(),
        "business": isEmptyString($("#id_business").val()) ? null : $("#id_business").val()
    };

    // alert("流程参数：" + JSON.stringify(uploadParam));
    $.ajax({
        type: "post",
        url: host + "/dcms/api/v1/workFlow/canCreate",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        crossDomain: false,
        data: JSON.stringify({
            "token": token,
            "workFlowType": workflowType,
            "srcFid": clientData.classificationIdentifier,
            "applyFileLevel": parseInt($("#id_fileLevel option:selected").val()),
            "fileState": preFileState
        }),
        success: function (data) {
            if (data.code == 0) {
                var ocx = document.getElementById("ocx");
                ocx.workflowCommit(JSON.stringify(uploadParam));
            } else {
                layer.alert(data.msg);
            }
        },
        error: function (data) {
        }
    });
}