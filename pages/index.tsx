import BookingAbsenecesDays from "@/components/calendar/BookingAbsenecesDays";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import BackgroundImage from "../assets/nasa-Q1p7bh3SHj8-unsplash.jpg";
import Header from "@/components/Header";
import { ContextProvider } from "@/context/ContextProvider";

export default function Home() {
  return (
    <ContextProvider>
      {/*bg-orange-300*/}
      <main className="h-screen w-screen overflow-hidden text-sm md:text-base">
        <Header />
        <Image
          src={BackgroundImage}
          alt="Background"
          fill
          className="-z-10 !hidden sm:!inline object-cover"
        />
        <div className="h-full flex justify-center pt-10 lg:pt:30">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BookingAbsenecesDays />
          </LocalizationProvider>
        </div>
      </main>
    </ContextProvider>
  );
}
