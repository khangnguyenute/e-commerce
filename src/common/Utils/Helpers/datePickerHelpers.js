import dayjs from "dayjs";

const calculateDatePickerRange = (value) => {
  switch (value.name) {
    case "today": {
      return {
        start: dayjs().startOf("day").toDate(),
        end: dayjs().endOf("day").toDate(),
      };
    }
    case "yesterday": {
      return {
        start: dayjs().add(-1, "day").toDate(),
        end: dayjs().add(-1, "day").toDate(),
      };
    }
    case "last7Days": {
      return {
        start: dayjs().add(-6, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case "last30days": {
      return {
        start: dayjs().add(-29, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case "thisMonth": {
      return {
        start: dayjs().startOf("month").toDate(),
        end: dayjs().toDate(),
      };
    }
    default: {
      return {
        start: dayjs().add(-1, "month").startOf("month").toDate(),
        end: dayjs().add(-1, "month").endOf("month").toDate(),
      };
    }
  }
};

export { calculateDatePickerRange };
