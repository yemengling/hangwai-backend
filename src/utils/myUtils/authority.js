// 获取表的操作权限数组
export const getAuthorityOpreateArea = (menuData, listAuth) => {
  let arr = [];

  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].pageNameEn === listAuth) {
      // 返回里面的opre
      if (menuData[i].opre) {
        arr = menuData[i].opre;
        return arr;
      } else {
        return arr;
      }
    }

    if (menuData[i].children) {
      arr = getAuthorityOpreateArea(menuData[i].children, listAuth);
      if (arr.length > 0) {
        return arr;
      }
    }
  }

  return arr;
};

// 具体是否可以操作
export const getAuthorityOpreatDetail = (areaArr, opreAuth) => {
  for (let i in areaArr) {
    for (let key in opreAuth) {
      if (areaArr[i].pageNameEn === opreAuth[key]) {
        opreAuth[key] = true;
        break;
      }
    }
  }

  return opreAuth;
};
