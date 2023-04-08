import moment from "moment";
export function timeDiff(startTime, endTime) {
  if (endTime?.split(" ").length === 1) {
    if (!startTime || !endTime) return "-";

    if (startTime < endTime)
      return moment
        .duration(moment(endTime).diff(moment(startTime)))
        .humanize();
    else
      return moment
        .duration(moment(endTime).diff(moment(startTime)))
        .humanize(1);
  } else {
    return endTime;
  }
}
