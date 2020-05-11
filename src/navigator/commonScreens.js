import {AppointmentFormScreen, CalendarScreen, DoctorInfoScreen} from '../screens/Common';
import {VisitCreatedModalScreen} from '../screens/Visits';

const commonScreens = {
    DoctorInfo: {
        screen: DoctorInfoScreen,
    },
    Calendar: {
        screen: CalendarScreen,
    },
    VisitCreated: {
        screen: VisitCreatedModalScreen,
    },
    AppointmentForm: {
        screen: AppointmentFormScreen,
    },
};

export {commonScreens};
