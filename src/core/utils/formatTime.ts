import {format} from "date-fns";

export function formatTime(date: Date) {
    return format(date, "H:mmaaa");
}