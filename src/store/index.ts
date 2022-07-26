import { createStore } from "vuex";
import { Itab } from './type'
interface State {
    // 定义数组类型
    tabsList: Array<Itab>,
    themecolor: String,
    token:String
}

const store = createStore<State>({

    state: {
        themecolor: "",
        // 定义Tab标签的数组
        tabsList: [],
        token:""
    },
    mutations: {
        // 添加tab标签
        addTab(state: State, tab: Itab) {
            const isSome = state.tabsList.some((item) => item.path == tab.path)
            if (!isSome) {
                state.tabsList.push(tab)
            }
        },
        closeCurrentTab(state: State, targetName: string) {
            const index = state.tabsList.findIndex((item) => item.path == targetName)
            state.tabsList.splice(index, 1)
        },
        setthmeColor(state, setcolor) {
            state.themecolor = setcolor
        },
    },
    getters: {
        getAddTab(state: State) {
            return state.tabsList
        },
        showColor(state: State) {
            return state.themecolor
        },
        token(state:state){
            return state.token
        }


    }
})

export default store