import { reactive, ref, toRefs } from "vue";

interface User {
    id: string
    name: string
    username: string
}
interface AreYouSure {
    title?: string
    content: string
    onYes?: VoidFunction
    onNo?: VoidFunction
}

interface GlobalState {
    user: User | null,
    loading: boolean
    loadingScreen: boolean
    areYouSure: AreYouSure | null
}

const state = reactive<GlobalState>({
    user: null,
    loading: false,
    loadingScreen: false,
    areYouSure: null,
})

export function useGlobalState() {
    function toggleLoading(overide?: boolean) {
        state.loading = overide ?? !state.loading
    }
    function toggleLoadingScreen(overide?: boolean) {
        state.loadingScreen = overide ?? !state.loadingScreen
    }
    function setUser(user: User | null) {
        state.user = user
    }
    function setAreYouSure(areYouSure: AreYouSure | null) {
        state.areYouSure = areYouSure
    }
    return {
        ...toRefs(state),
        setUser,
        setAreYouSure,
        toggleLoading,
        toggleLoadingScreen,
    }
}