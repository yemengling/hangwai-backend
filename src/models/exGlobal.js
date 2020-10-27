import { getCityList, getSchoolList } from "@/services/exGlobalApi";

export default {
    namespace: 'exGlobal',
    state: {
        menuData: [],
        cityList: [],
        schoolList: []
    },
    effects: {
        * getCurrentUser(_, { put, call }) {
            const response = yield call(getCurrentUser);

            yield put({
                type: 'saveMenuData',
                payload: {
                    pageList: data
                }
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
        }
    },
    reducers: {
        saveMenuData(state, { payload }) {
            const menuDataArr = changeToMenuData(payload);

            return {
                ...state,
                menuData: menuDataArr
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
        }
    }
}