const resetDoctorsFilter = () => {
    return {
        type: 'RESET_DOCTORS_FILTER',
    };
};

const resetStore = () => {
    return {
        type: 'RESET_STORE',
    };
};

const updateToken = (token) => {
    return {
        type: 'UPDATE_TOKEN',
        payload: token,
    };
};

const doctorsLoaded = (newDoctors) => {
    return {
        type: 'DOCTORS_LOADED',
        payload: newDoctors,
    };
};

const doctorInfoLoaded = (doctorInfo) => {
    return {
        type: 'DOCTOR_INFO_LOADED',
        payload: doctorInfo,
    };
};

const pageLoading = () => {
    return {
        type: 'PAGE_LOADING',
    };
};

const pageLoaded = () => {
    return {
        type: 'PAGE_LOADED',
    };
};

const fetchError = (error) => {
    return {
        type: 'FETCH_FAILURE',
        payload: error,
    };
};

const specialtiesLoaded = (newSpecialties) => {
    return {
        type: 'SPECIALTIES_LOADED',
        payload: newSpecialties,
    };
};

/**
 *
 * @param specialtiesStoreService
 * @returns {function(): Function}
 */
const fetchSpecialties = (specialtiesStoreService) => () => (dispatch) => {
    dispatch(pageLoading());
    specialtiesStoreService
        .getList()
        .then((data) => dispatch(specialtiesLoaded(data)))
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const fetchSpecialtyDoctors = (doctorsStoreService) => (specialty, cb) => (dispatch, getState) => {
    dispatch(resetDoctorsFilter());
    let state = getState();
    let doctorsFilter = state.doctors_filter;
    doctorsFilter.specialty = specialty;
    //
    dispatch(pageLoading());
    doctorsStoreService
        .search(doctorsFilter)
        .then((data) => {
            dispatch(doctorsLoaded(data));
            cb();
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const fetchDoctorInfo = (doctorsStoreService) => (doctor, cb) => (dispatch, getState) => {
    let state = getState();
    let doctorsFilter = state.doctors_filter;
    //
    dispatch(pageLoading());
    doctorsStoreService
        .getInfo(doctor, doctorsFilter)
        .then((data) => {
            dispatch(doctorInfoLoaded(data));
            cb();
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => {
            dispatch(pageLoaded());
            console.log(getState());
        });
};

/**
 *
 */
export {
    fetchSpecialties,
    fetchSpecialtyDoctors,
    fetchDoctorInfo,
    resetStore,
    updateToken,
};
