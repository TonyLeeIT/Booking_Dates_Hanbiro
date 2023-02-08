import BookingAbsenecesDays from "@/components/calendar/BookingAbsenecesDays";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import BackgroundImage from "../assets/nasa-Q1p7bh3SHj8-unsplash.jpg";
import Header from "@/components/Header";
import { ContextProvider } from "@/context/ContextProvider";
import { Schedule, User } from "@/interface";
import axios from "axios";
interface Props {
  me: User;
}

export default function Home({ me }: Props) {
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

//export const getServerSideProps = async (ctx: any) => {
//  const jwt = ctx.req?.cookies["jwt"];
//  const res = await axios.get(
//    `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/auth/me`,
//    {
//      headers: {
//        Authorization: "Bearer " + jwt,
//      },
//    }
//  );
//  return {
//    props: {
//      me: res.data,
//    },
//  };
//};
