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