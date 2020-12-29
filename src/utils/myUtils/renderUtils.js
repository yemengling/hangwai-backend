// 权限数据格式
export const formatPermission = (permission) => {
    let arr = [];

    for(let i = 0; i < permission.length; i++){
        if(permission[i].children && permission[i].children[0]){
            for(let j = 0; j < permission[i].children.length; j++){
                const children = permission[i].children[j];
                const oThreeList = {
                    title: children.name,
                    value: children.permissionId,
                    key: children.permissionId,
                    children: []
                };
    
                if(children.operation && children.operation[0]){
                    for(let z = 0; z < children.operation.length; z++){
                        const oThreeItem = {
                            title: children.operation[z].name,
                            value: children.operation[z].permissionId,
                            key: children.operation[z].permissionId
                        };
        
                        oThreeList.children.push(oThreeItem);
                    }
                }
    
                arr.push(oThreeList);
            }
        }
    }
    
    return arr;
};

// 城区数据格式
export const formatCity = (city) => {
    let arr = [];

    for (let i = 0; i < city.length; i++) {
        arr.push({
            id: city[i].cityId,
            text: city[i].name
        })
    }
    
    return arr;
};

// 学校数据格式
export const formatSchool = (school) => {
    let arr = [];

    for (let i = 0; i < school.length; i++) {
        arr.push({
            id: school[i].schoolId,
            text: school[i].name
        })
    }
    
    return arr;
};

// 角色数据格式
export const formatRole = (role) => {
    let arr = [];

    for (let i = 0; i < role.length; i++) {
        arr.push({
            id: role[i].roleId,
            text: role[i].name
        })
    }
    
    return arr;
};

// 权限树形数据格式
export const formatTree = (tree) => {
    let asTreeData = [],
        arr = []
    ;

    if(tree){
        asTreeData = tree.split(",");

        for (let i = 0; i < asTreeData.length; i++) {
            arr.push(Number(asTreeData[i]))
        }
    }

    return arr;
};