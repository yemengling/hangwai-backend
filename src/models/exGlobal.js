export default {
    namespace: 'exGlobal',
    state: {
        menuData: []
    },
    effects: {
        * getCurrentUser(_, {put, call}) {
            const response = yield call(getCurrentUser);

            yield put({
                type: 'saveMenuData',
                payload: {
                    pageList: data
                }
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
        }
    }
}