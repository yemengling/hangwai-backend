import { getMenuData, getPermissionList, getCityList, getSchoolList, getRoleList } from "@/services/exGlobalApi";

export default {
    namespace: 'exGlobal',
    state: {
        menuData: [],
        permissionList: [],
        cityList: [],
        schoolList: [],
        roleList: [],
    },
    effects: {
        * getMenuData(_, { put, call }) {
            const response = yield call(getMenuData);

            yield put({
                type: 'saveMenuData',
                payload: response.r
            });
        },
        * getPermissionList(_, { put, call }) {
            const response = yield call(getPermissionList);

            yield put({
                type: 'savePermissionList',
                payload: response.r
            });
        },
        * getCityList(_, { put, call }) {
            const response = yield call(getCityList);

            yield put({
                type: 'saveCityList',
                payload: response.r
            });
        },
        * getSchoolList({ payload }, { put, call }) {
            const response = yield call(getSchoolList, payload);

            yield put({
                type: 'saveSchoolList',
                payload: response.r
            });
        },
        * getRoleList(_, { put, call }) {
            const response = yield call(getRoleList);

            yield put({
                type: 'saveRoleList',
                payload: response.r
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
        savePermissionList(state, { payload }) {
            return {
                ...state,
                permissionList: payload
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