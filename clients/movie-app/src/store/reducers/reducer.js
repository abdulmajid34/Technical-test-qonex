const initialState = {
    list_movies: [],
    movies_details: {},
    loading: false,
    isError: false
}

function movies_reducer(state = initialState, action) {
    let { type, payload } = action
    switch(type) {
        case 'show/list/movies':
            return { ...state, list_movies: payload }
        case 'show/loading':            
            return { ...state, loading: payload }
        case 'show/error':
            return { ...state, error: payload }
        default:
        return state
    }

}

export default movies_reducer;