import { configureStore } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"
import movies_reducer from "./reducers/reducer"

const store = configureStore({reducer: movies_reducer})

export default store