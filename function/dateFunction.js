import moment from 'moment';

export function expiringFunction(inDate){
    const inDateF = new moment(inDate)
    const dateT = new moment()
    const diff = inDateF.diff(dateT, 'days')
    return diff
}

export function timeGone(inDate){
    const inDateF = new moment(inDate)
    const dateT = new moment()
    const diff = dateT.diff(inDateF, 'hours')
    return diff+" hours"
}

export function formateIncomingDate(inDate){
    const date = new moment(inDate)
    return date.format("LL")
}

export function formateIncomingDateMMLL(inDate){
    const date = new moment(inDate)
    return date ? date.format("MM/DD/YY") : ""
}

export function toAPIFormat(datS){
    return moment(Date.parse(datS)).format("YYYY-MM-DDTHH:mm:ss")+"Z";
}
