const filterInitialState = {
    date: null,
    specialty: null,
    clinic: null,
    gender: null,
};

const initialState = {
    token_info: null,
    internet_status: true,
    doctors: [],
    favorite_doctors: [],
    specialties: [],
    page_loader: false,
    doctor_info: {},
    clinics: [],
    visits: [],
    profile: {},
    doctors_filter: filterInitialState,
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN_INFO':
            return {
                ...state,
                token_info: action.payload,
            };
        case 'DOCTORS_LOADED':
            return {
                ...state,
                doctors: action.payload,
            };
        case 'DOCTOR_INFO_LOADED':
            return {
                ...state,
                doctor_info: action.payload,
            };
        case 'SPECIALTIES_LOADED':
            return {
                ...state,
                specialties: action.payload,
            };
        case 'CLINICS_LOADED':
            return {
                ...state,
                clinics: action.payload,
            };
        case 'RESET_DOCTORS_FILTER':
            return {
                ...state,
                doctors_filter: filterInitialState,
            };
        case 'PAGE_LOADED':
            return {
                ...state,
                page_loader: false,
            };
        case 'UPDATE_INTERNET_STATUS':
            return {
                ...state,
                internet_status: action.payload,
            };
        case 'UPDATE_PROFILE':
            return {
                ...state,
                profile: action.payload,
            };
        case 'UPDATE_PROFILE_PHONE_NUMBER':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    phone_number: action.payload,
                },
            };
        case 'FAVORITE_DOCTORS_LOADED':
            return {
                ...state,
                favorite_doctors: action.payload,
            };
        case 'PAGE_LOADING':
            return {
                ...state,
                page_loader: true,
            };
        case 'CHANGE_DOCTOR_FAVORITE_STATUS':
            state.doctor_info.is_favorite = action.payload;
            return {...state};

        case 'RESET_STORE':
            return initialState;

        case 'FETCH_FAILURE':
            return {
                ...state,
                fetch_error: action.payload,
            };

        case 'VISITS_LOADED':
            return {
                ...state,
                visits: action.payload,
            };

        case 'UPDATE_DOCTORS_FILTER':
            return {
                ...state,
                doctors_filter: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
