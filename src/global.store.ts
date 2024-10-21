import { reactive, toRefs } from "vue";
import { WeatherDetailsApi, ForcastWeatherDetailsApi } from "./types/weather";

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
    [key: string]: unknown | null
    user: User | null,
    loading: boolean
    loadingScreen: boolean
    areYouSure: AreYouSure | null,
    weatherDetails: WeatherDetailsApi | null
    forecastWeatherDetails: ForcastWeatherDetailsApi | null
}

const initState = {
    user: null,
    loading: false,
    loadingScreen: false,
    areYouSure: null,
    weatherDetails: null,
    forecastWeatherDetails: null,
}

const state = reactive<GlobalState>(initState)

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
    function setWeatherDetails(details: WeatherDetailsApi | null) {
        state.weatherDetails = details
    }
    function setForecastWeatherDetails(details: ForcastWeatherDetailsApi | null) {
        state.forecastWeatherDetails = details
    }
    function resetAll() {
        for (const key in state) {
            state[key] = null
        }
    }
    return {
        ...toRefs(state),
        resetAll,
        setUser,
        setAreYouSure,
        setWeatherDetails,
        setForecastWeatherDetails,
        toggleLoading,
        toggleLoadingScreen,
    }
}