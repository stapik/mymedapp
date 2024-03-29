import _ from 'lodash';

const resetDoctorsFilter = () => {
    return {
        type: 'RESET_DOCTORS_FILTER',
    };
};

const updateDoctorsFilter = (filter) => {
    return {
        type: 'UPDATE_DOCTORS_FILTER',
        payload: filter,
    };
};

const updateAppRateDate = (date) => {
    return {
        type: 'UPDATE_APP_RATE_DATE',
        payload: date,
    };
};

const resetStore = () => {
    return {
        type: 'RESET_STORE',
    };
};

const updateInternetStatus = (status) => {
    return {
        type: 'UPDATE_INTERNET_STATUS',
        payload: status,
    };
};

const updateProfile = (profile) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: profile,
    };
};

const updateProfilePhoneNumber = (phone_number) => {
    return {
        type: 'UPDATE_PROFILE_PHONE_NUMBER',
        payload: phone_number,
    };
};

const updateTokenInfo = (token_info) => {
    return {
        type: 'UPDATE_TOKEN_INFO',
        payload: token_info,
    };
};

const doctorsLoaded = (newDoctors) => {
    return {
        type: 'DOCTORS_LOADED',
        payload: newDoctors,
    };
};

const favoriteDoctorsLoaded = (favoriteDoctors) => {
    return {
        type: 'FAVORITE_DOCTORS_LOADED',
        payload: favoriteDoctors,
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

const clinicsLoaded = (newClinics) => {
    return {
        type: 'CLINICS_LOADED',
        payload: newClinics,
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

const changeDoctorFavoriteStatus = (newStatus) => {
    return {
        type: 'CHANGE_DOCTOR_FAVORITE_STATUS',
        payload: newStatus,
    };
};

const visitsLoaded = (visits) => {
    return {
        type: 'VISITS_LOADED',
        payload: visits,
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
        .then(({data}) => {
            dispatch(specialtiesLoaded(data));
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param visitsStoreService
 * @returns {function(): Function}
 */
const fetchVisits = (visitsStoreService) => (finalCb, successCallback) => (dispatch) => {
    const isDefault = !_.isFunction(finalCb);

    if (isDefault) {
        dispatch(pageLoading());
    }
    visitsStoreService
        .getList()
        .then(({data}) => {
            dispatch(visitsLoaded(data));
            if (_.isFunction(successCallback)) {
                successCallback(data);
            }
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => {
            isDefault ? dispatch(pageLoaded()) : finalCb();
        });
};

/**
 *
 * @param visitsStoreService
 * @returns {function(): Function}
 */
const deleteVisit = (visitsStoreService) => (id, successCb) => (dispatch) => {
    dispatch(pageLoading());
    visitsStoreService
        .delete(id)
        .then(() => {
            successCb();
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param visitsStoreService
 * @returns {function(): Function}
 */
const cancelVisit = (visitsStoreService) => (id, successCb) => (dispatch) => {
    dispatch(pageLoading());
    visitsStoreService
        .cancel(id)
        .then(() => {
            successCb();
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param clinicsStoreService
 * @returns {function(): Function}
 */
const fetchClinics = (clinicsStoreService) => () => (dispatch) => {
    dispatch(pageLoading());
    clinicsStoreService
        .getList()
        .then(({data}) => {
            dispatch(clinicsLoaded(data));
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => dispatch(pageLoaded()));
};


/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const searchDoctors = (doctorsStoreService) => (cb) => (dispatch, getState) => {
    let state = getState();
    let doctorsFilter = state.doctors_filter;
    //
    dispatch(pageLoading());
    doctorsStoreService
        .search(doctorsFilter)
        .then(({data}) => {
            dispatch(doctorsLoaded(data));
            cb();
        })
        .catch((err) => {
            dispatch(fetchError(err));
        })
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const fetchFavoriteDoctors = (doctorsStoreService) => () => (dispatch) => {
    //
    dispatch(pageLoading());
    doctorsStoreService
        .getFavoriteDoctors()
        .then(({data}) => {
            dispatch(favoriteDoctorsLoaded(data));
        })
        .catch((err) => {
            dispatch(fetchError(err));
        })
        .finally(() => dispatch(pageLoaded()));
};

/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const fetchDoctorInfo = (doctorsStoreService) => (doctor, successCb) => (dispatch, getState) => {
    let state = getState();
    let doctorsFilter = state.doctors_filter;
    //
    dispatch(pageLoading());
    doctorsStoreService
        .getInfo(doctor, doctorsFilter)
        .then(({data}) => {
            dispatch(doctorInfoLoaded(data));
            successCb();
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => {
            dispatch(pageLoaded());
        });
};

/**
 *
 * @param visitsStoreService
 * @returns {function(*, *=): Function}
 */
const createVisit = (visitsStoreService) => (data, successCb) => (dispatch) => {
    dispatch(pageLoading());
    visitsStoreService
        .create(data)
        .then(({data}) => {
            successCb(data);
        })
        .catch((err) => dispatch(fetchError(err)))
        .finally(() => {
            dispatch(pageLoaded());
        });
};

/**
 *
 * @param doctorsStoreService
 * @returns {function(*, *=): Function}
 */
const toggleFavoriteDoctor = (doctorsStoreService) => () => (dispatch, getState) => {
    const state = getState();
    const doctor_info = state.doctor_info;
    const old_favorite_status = doctor_info.is_favorite;
    const new_favorite_status = !old_favorite_status;

    //
    dispatch(changeDoctorFavoriteStatus(new_favorite_status));
    doctorsStoreService
        .toggleFavoriteStatus(doctor_info.id, new_favorite_status)
        .catch((err) => {
            dispatch(changeDoctorFavoriteStatus(old_favorite_status));
            dispatch(fetchError(err));
        });
};

/**
 *
 */
export {
    fetchSpecialties,
    searchDoctors,
    fetchFavoriteDoctors,
    fetchDoctorInfo,
    updateDoctorsFilter,
    resetStore,
    updateTokenInfo,
    resetDoctorsFilter,
    updateInternetStatus,
    toggleFavoriteDoctor,
    fetchClinics,
    createVisit,
    updateProfile,
    updateProfilePhoneNumber,
    fetchVisits,
    deleteVisit,
    cancelVisit,
    updateAppRateDate,
};
