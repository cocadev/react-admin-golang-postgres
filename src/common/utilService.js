import React from 'react';
import moment from 'moment'
class UtilService {

    static convertWeekDay(dayNum) {
        switch (dayNum) {
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            case 0: return "Sunday";
        }
        return "Monday";
    }

    static b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    static getDateTime(dateTimeStr) {
        if (dateTimeStr && dateTimeStr != '')
            return moment.unix(new Date(dateTimeStr).getTime() / 1000).format("YYYY-MM-DD HH:mm:ss");

        return '-'
    }

    static getDateTime3(dateTimeStr) {
        if (dateTimeStr && dateTimeStr != '')
            return moment.unix(new Date(dateTimeStr).getTime() / 1000).format("YYYY-MM-DD HH:mm");
        return '-'
    }
    static getDateTime2ByFormat(dateTimeStr, format) {
        if (dateTimeStr) {
            if (typeof dateTimeStr == 'string') {
                if (dateTimeStr.startsWith('0001-01-01'))
                    return ''
            }
        }
        if (dateTimeStr && dateTimeStr != '')
            return moment.unix(new Date(dateTimeStr).getTime() / 1000).format(format);
        return '-'
    }
    static getDate(dateTimeStr) {
        if (!dateTimeStr || dateTimeStr == "")
            return ""

        return moment.unix(new Date(dateTimeStr).getTime() / 1000).format("YYYY-MM-DD");
    }
    static getTime(dateTimeStr) {
        return moment.unix(new Date(dateTimeStr).getTime() / 1000).format("HH:mm:ss");
    }
    static getTimeExceptSecond(dateTimeStr) {
        return moment.unix(new Date(dateTimeStr).getTime() / 1000).format("HH:mm");
    }
    static getDateTimeByFormat(ts, format) {
        return moment.unix(ts / 1000).format(format);
    }
    static getDateTime2(ts) {
        return moment.unix(ts / 1000).format("HH:mm:ss");
    }

    static getDateTimeFromSeconds(secs, format) {
        return moment.unix(secs).format(format);
    }
    static getRemainedTime(dateTimeStr) {
        var delta = UtilService.getRemainedSeconds(dateTimeStr);
        return UtilService.getTimeFromSeconds(delta)
    }
    static getRemainedTime2(dateTimeStr, current) {
        var delta = UtilService.getRemainedSeconds(dateTimeStr, current);
        return UtilService.getTimeFromSeconds(delta)
    }
    static getRemainedSeconds(dateTimeStr, current) {
        var curr = current ? current : new Date()
        var delta = Math.floor(new Date(dateTimeStr).getTime() / 1000 - curr.getTime() / 1000);
        return delta;
    }

    static getPassDate(dateTimeStr) {
        var days = Math.floor((Date.now() - new Date(dateTimeStr).getTime()) / 1000 / 3600 / 24)
        return days
    }

    static getUserName(user) {
        if(!user) return '-'

        return user.firstname + ' ' + user.lastname
    }

    static checkNumber(val) {
      var isnum = /^\d+$/.test(val);
      return isnum;
    }

    static getProviderName(id) {
        switch(id){
            case '2':
                return "GTA"
            case '3':
                return "HotelBed"
            case '6':
                return "Agoda"
            case '10':
                return "Team America"
            case '11':
                return "HotelDo"
            case '12':
                return "Restel"
        }

        return "Unknown"
    }
}

export default UtilService;
