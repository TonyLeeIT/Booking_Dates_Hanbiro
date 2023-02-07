import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@material-ui/styles";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const isWeekend = (date: Dayjs) => {
  const day = date.day();
  return day === 0 || day === 6;
};
const isNextMonth = (date: Dayjs) => {
  const startOfNextMonth = moment().add(1, "month").startOf("month");
  const endOfNextMonth = moment().add(1, "month").endOf("month");
  return date >= startOfNextMonth && date <= endOfNextMonth;
};
const disableDates = (date: Dayjs) => {
  return (
    isWeekend(date) ||
    dayjs().month() < date.month() ||
    dayjs().year() < date.year()
  );
};
const useStyles = makeStyles({
  "css-hlj6pa-MuiDialogActions-root": {
    display: "none !important",
  },
  "css-1hbyad5-MuiTypography-root": {
    color: "inherit",
  },
  "css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "rgb(157 23 77) !important",
  },
  "css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "rgb(157 23 77) !important",
    color: "white !important",
  },
  "css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
    borderColor: "transparent !important",
    color: "rgb(157 23 77)",
  },
  "css-u0soqy-MuiPickerStaticWrapper-root": {
    boxShadow:
      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  },
});

const BookingAbsenecesDays = (props: Props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [highlightedDays, setHighlightedDays] = useState<Array<number>>([]);
  const [reStyle, setReStyle] = useState<string | null>();
  useEffect(() => {
    const styling = (): void => {
      const style = `${classes["css-hlj6pa-MuiDialogActions-root"]} 
      ${classes["css-1hbyad5-MuiTypography-root"]} 
      ${classes["css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected"]} 
      ${classes["css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected"]} 
      ${classes["css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)"]} 
      ${classes["css-u0soqy-MuiPickerStaticWrapper-root"]}`;
      setReStyle(style);
    };
    styling();
  }, [reStyle]);

  const clearSelected = () => {
    setHighlightedDays([]);
    //window.location.reload();
  };

  return (
    <div className="max-w-md lg:max-w-xl w-full flex flex-col text-pink-800">
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={selectedDate}
        shouldDisableDate={disableDates}
        disablePast
        onChange={(newValue) => {
          setSelectedDate(newValue);
          if (newValue?.date() === dayjs().date()) {
            // alert("Please , choose another date other than today");
            toast.warn("🚀 Please , choose another date other than today!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          if (
            newValue &&
            newValue.date() != dayjs().date() &&
            highlightedDays.length < 3
          ) {
            setHighlightedDays((currDate) => [...currDate, newValue.date()]);
          }
          if (highlightedDays.length === 3)
            toast.info("Over limit maximum of 3 choices 😢😢😢", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
        }}
        renderInput={(params) => <TextField {...params} />}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays.indexOf(day.date()) >= 0;
          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              badgeContent={
                isSelected &&
                dayjs().month() == day.month() &&
                dayjs().year() == day.year() ? (
                  <CheckIcon color="success" />
                ) : undefined
              }
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
      <div className="bg-white w-full shadow-lg md:shadow-xl ">
        <div className="flex justify-end px-5">
          {" "}
          <button className="schedule-button">Pick</button>
          <button className="schedule-button" onClick={clearSelected}>
            Clear
          </button>
        </div>
        {highlightedDays.length > 0 && (
          <div className="px-5 pb-2">
            {" "}
            <h1 className="text-md lg:text-xl">{`Schedule Of Lee Min Tae`}</h1>
            {highlightedDays.map((dayOff, index: number) => (
              <span className="flex px-10" key={index}>
                <p className="text-xs lg:text-lg">
                  DayOff {dayOff}-{dayjs().month()}-{dayjs().year()}
                </p>
              </span>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookingAbsenecesDays;
