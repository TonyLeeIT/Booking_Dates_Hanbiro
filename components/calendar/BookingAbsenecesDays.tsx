import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@mui/styles";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "@/context/ContextProvider";
import axios, { AxiosError } from "axios";
import { Schedule } from "@/interface";

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
  "css-14b29qc": {
    display: "none !important",
  },
  "css-wed0tz.Mui-selected": {
    backgroundColor: "rgb(157 23 77) !important",
  },
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

const toastStyle: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const BookingAbsenecesDays = (props: Props) => {
  const { user } = useStateContext();

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [highlightedDays, setHighlightedDays] = useState<Array<number>>([]);
  const [reStyle, setReStyle] = useState<string | null>();
  const [pickUpResult, setPickUpResult] = useState<string>("");
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
  }, [classes]);

  const clearSelected = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/schedule`, {
        params: { userid: user.userid },
      })
      .then((res) => {
        setHighlightedDays([]);
        setPickUpResult("");
        toast.success("Clear schedule successfully", toastStyle);
      })
      .catch((err: AxiosError) => {
        toast.error(`Clear schedule failure ${err.message}`, toastStyle);
      });
  };

  const pickSchedule = () => {
    if (highlightedDays.length > 0 && user.userid) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/schedule`, {
          userid: user.userid,
          dayOffs: highlightedDays.toString(),
        })
        .then((res) => {
          const schedule: Schedule = res.data;
          setPickUpResult(schedule.dayOffs);
          toast.success("Pick up schedule successfully", toastStyle);
        })
        .catch((err: AxiosError) => {
          toast.error(`Pick up schedule failure ${err.message}`, toastStyle);
        });
    } else {
      toast.warn("Please, choose at least one day", toastStyle);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/schedule`,
          {
            params: { userid: user.userid },
          }
        );
        const schedule: Schedule = res.data;
        if (schedule) {
          const datesOff: Array<number> = schedule.dayOffs
            .split(",")
            .map((day) => Number(day));
          setHighlightedDays(datesOff);
          setPickUpResult(schedule.dayOffs);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user]);
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
            toast.warn(
              "🚀 Please , choose another date other than today!",
              toastStyle
            );
          }
          if (
            newValue &&
            newValue.date() != dayjs().date() &&
            highlightedDays.length < 3
          ) {
            setHighlightedDays((currDate) => [...currDate, newValue.date()]);
          }
          if (highlightedDays.length === 3)
            toast.info("Over limit maximum of 3 choices 😢😢😢", toastStyle);
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
          <button
            className="schedule-button"
            onClick={pickSchedule}
            disabled={pickUpResult?.split(",").length >= 3}
          >
            Pick
          </button>
          <button
            className="schedule-button"
            onClick={clearSelected}
            disabled={pickUpResult === "" && highlightedDays.length === 0}
          >
            Clear
          </button>
        </div>
        {pickUpResult && (
          <div className="px-5 pb-2">
            {" "}
            <h1 className="text-md lg:text-lg inline">{`Schedule Of ${user.displayName} :`}</h1>
            <p className="text-xs lg:text-md inline">
              ` DatesOff {pickUpResult}/{dayjs().month()}/{dayjs().year()}`
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingAbsenecesDays;
