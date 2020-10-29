import { getMenuData, getCityList, getSchoolList, getRoleList } from "@/services/exGlobalApi";

export default {
    namespace: 'exGlobal',
    state: {
        menuData: [],
        cityList: [],
        schoolList: [],
        roleList: [],
    },
    effects: {
        * getMenuData(_, { put, call }) {
            // const response = yield call(getMenuData);

            const response = {
                code: 0,
                data: [
                    {
                        pageEnName: 'dataManage',
                        children: [
                            {
                                pageEnName: 'schoolList',
                                operation: [
                                    {
                                        name: "新增",
                                        pageEnName: "schoolList_add"
                                    },
                                    {
                                        name: "编辑",
                                        pageEnName: "schoolList_update"
                                    },
                                    {
                                        name: "删除",
                                        pageEnName: "schoolList_delete"
                                    }
                                ]
                            },
                            {
                                pageEnName: 'studentList',
                                operation: [
                                    {
                                        name: "新增",
                                        pageEnName: "studentList_add"
                                    },
                                    {
                                        name: "编辑",
                                        pageEnName: "studentList_update"
                                    },
                                    {
                                        name: "删除",
                                        pageEnName: "studentList_delete"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        pageEnName: 'systemManage',
                        children: [
                            {
                                pageEnName: 'roleList',
                                operation: [
                                    {
                                        name: "新增",
                                        pageEnName: "roleList_add"
                                    },
                                    {
                                        name: "编辑",
                                        pageEnName: "roleList_update"
                                    },
                                    {
                                        name: "删除",
                                        pageEnName: "roleList_delete"
                                    }
                                ]
                            },
                            {
                                pageEnName: 'accountList',
                                operation: [
                                    {
                                        name: "新增",
                                        pageEnName: "accountList_add"
                                    },
                                    {
                                        name: "编辑",
                                        pageEnName: "accountList_update"
                                    },
                                    {
                                        name: "删除",
                                        pageEnName: "accountList_delete"
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }

            yield put({
                type: 'saveMenuData',
                payload: response.data
            });
        },
        * getCityList(_, { put, call }) {
            // const response = yield call(getCityList);

            const response = {
                code: 0,
                data: [
                    {
                        id: 1,
                        text: '城区1'
                    }
                ]
            }

            yield put({
                type: 'saveCityList',
                payload: response.data
            });
        },
        * getSchoolList(_, { put, call }) {
            // const response = yield call(getSchoolList);

            const response = {
                code: 0,
                data: [
                    {
                        id: 1,
                        text: '学校1'
                    }
                ]
            }

            yield put({
                type: 'saveSchoolList',
                payload: response.data
            });
        },
        * getRoleList(_, { put, call }) {
            // const response = yield call(getSchoolList);

            const response = {
                code: 0,
                data: [
                    {
                        id: 1,
                        text: '角色1'
                    }
                ]
            }

            yield put({
                type: 'saveRoleList',
                payload: response.data
            });
        }
    },
    reducers: {
        saveMenuData(state, { payload }) {
            return {
                ...state,
                menuData: payload
            }
        },
        saveCityList(state, { payload }) {
            return {
                ...state,
                cityList: payload
            };
        },
        saveSchoolList(state, { payload }) {
            return {
                ...state,
                schoolList: payload
            };
        },
        saveRoleList(state, { payload }) {
            return {
                ...state,
                roleList: payload
            };
        }
    }
}