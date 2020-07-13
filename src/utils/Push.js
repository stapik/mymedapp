import * as PushNotification from 'react-native-push-notification';
import {Constants} from './index';
import moment from 'moment';

const Push = {
    /**
     *
     * @param visit_id
     * @param time_start
     */
    createVisitPush: function (visit_id, time_start) {
        const beforeVisitHours = 2;
        const slotTime = moment(time_start);

        if (moment(time_start).subtract(beforeVisitHours, 'hours').isBefore()) {
            return;
        }

        const pushMsgTime = 'Прием у врача' + slotTime.format(' D MMMM [в] HH:mm').toLowerCase();
        Push.schedule(visit_id, pushMsgTime, slotTime.subtract(beforeVisitHours, 'hours').toDate());
    },

    /**
     *
     */
    requestPermissions: function () {
        PushNotification.requestPermissions();
    },

    /**
     *
     */
    checkPermissions: function (cb) {
        PushNotification.checkPermissions(cb);
    },

    /**
     *
     * @param id
     * @returns {{userInfo: {id: *}}|{id: *}}
     */
    getIdInfo: function (id) {
        switch (Constants.os) {
            case 'ios':
                return {userInfo: {id: id.toString()}};
            case 'android':
                return {id: id.toString()};
            default:
                return;
        }

    },

    /**
     *
     * @param id
     * @param message
     */
    now: function (id, message) {
        PushNotification.localNotification({
            largeIcon: 'icon',
            message: message,
            ...this.getIdInfo(id),
        });
    },

    /**
     *
     * @param id
     * @param message
     * @param date
     */
    schedule: function (id, message, date) {
        const my_obj = {
            largeIcon: 'icon',
            ...this.getIdInfo(id),
            message: message,
            date: date,
        };
        PushNotification.localNotificationSchedule(my_obj);
    },

    /**
     * Отмена по id
     * @param id
     */
    cancel: function (id) {
        PushNotification.cancelLocalNotifications({id: id.toString()});
    },

    /**
     *
     */
    cancelAll: function () {
        PushNotification.cancelAllLocalNotifications();
    },
};

export default Push;
