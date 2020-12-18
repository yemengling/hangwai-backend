// 获取表的操作权限数组
export const getAuthorityOpreateArea = (menuData, listAuth) => {
  let asOperation = [];

  if(menuData && menuData[0]){
    for (let i = 0; i < menuData.length; i++) {
      if (menuData[i].pageEnName === listAuth) {
        asOperation = menuData[i].operation;
      } else if (menuData[i].children) {
        asOperation = getAuthorityOpreateArea(menuData[i].children, listAuth);
      
        if(asOperation && asOperation[0]){
          return asOperation;
        }
      }
    }
  }
  
  return asOperation;
};

// 具体是否可以操作
export const getAuthorityOpreatDetail = (areaArr, opreAuth) => {
  for (let i in areaArr) {
    for (let key in opreAuth) {
      if (areaArr[i].pageEnName === opreAuth[key]) {
        opreAuth[key] = true;
        break;
      }
    }
  }

  return opreAuth;
};
