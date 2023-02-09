import Image from "next/image";
import BackgroundImage from "../assets/nasa-Q1p7bh3SHj8-unsplash.jpg";
import { HTMLInputTypeAttribute, useState } from "react";
import { useRouter } from "next/router";
import { AuthResponse, Sign } from "../interface";
import axios, { AxiosError } from "axios";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {};

interface Message {
  status: number;
  message: string;
}

const Login = (props: Props) => {
  const route = useRouter();
  const [sign, setSign] = useState<string>(Sign.In);
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(
    "password"
  );

  const switchTo = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (sign === Sign.In) {
      setSign(Sign.Up);
    } else if (sign === Sign.Up) {
      setSign(Sign.In);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (sign) {
      case Sign.In:
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/auth/login`,
            {
              userid,
              password,
            }
          )
          .then((res) => {
            const { jwt: token }: AuthResponse = res.data;
            document.cookie = `jwt=${token}`;
            setMessage({
              status: res.status,
              message: "Authentication Complete!",
            });
            setOpen(true);
            route.push("/");
          })
          .catch((err: AxiosError) => {
            const { error: result }: any =
              err.response?.data || "Disconnect To Server Side";
            setMessage({
              status: 401,
              message: result,
            });
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          });
        break;
      case Sign.Up:
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/auth/register`,
            {
              userid,
              password,
            }
          )
          .then((res) => {
            setMessage({
              status: res.status,
              message: "Register Success!",
            });
            setOpen(true);
            setTimeout(() => {
              setSign(Sign.In);
              setOpen(false);
            }, 1000);
          })
          .catch((err: AxiosError) => {
            const { error: result }: any =
              err.response?.data || "Disconnect To Server Side";
            setMessage({
              status: 401,
              message: result,
            });
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          });
        break;
    }
  };
  const handleToggle = () =>{
    if(type === "password"){
      setType("text")
    }
    if(type === "text"){
      setType("password")
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center bg-white items-center md:bg-transparent font-semibold">
      <Collapse className="absolute top-4" in={open}>
        <Alert
          severity={message?.status === 401 ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message?.message}
        </Alert>
      </Collapse>
      <Image
        src={BackgroundImage}
        alt="Background"
        fill
        className="-z-10 !hidden sm:!inline object-cover"
      />

      <form className="relative mt-24 space-y-8 rounded-sm lg:rounded-lg bg-white/50 py-10 px-6 md:mt-0 w-full max-w-sm md:max-w-md md:px-14">
        <h1 className="text-4xl">{`Sign ${sign}`}</h1>
        <div className="space-y-4">
          <label className="w-full">
            <span className={`label`}>
              <input
                type="text"
                placeholder="UID"
                className={`input`}
                name="userid"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
                autoFocus
              />
            </span>
          </label>
          <label className="w-full">
            <span className={`label`}>
              <input
                className={`input`}
                type={type}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {type === "password" ? (
                <VisibilityOffIcon className="absolute right-1 top-1/2 h-4 w-4 cursor-pointer" onClick={handleToggle}/>
              ) : (
                <VisibilityIcon className="absolute right-1 top-1/2 h-4 w-4 cursor-pointer" onClick={handleToggle} />
              )}
            </span>
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-2"
          onClick={handleClick}
        >
          {`Sign ${sign}`}
        </button>
        <button
          className="cursor-pointer text-blue-700 hover:underline"
          onClick={switchTo}
        >
          Sign {sign === Sign.In ? Sign.Up : Sign.In} now
        </button>
      </form>
    </div>
  );
};

export default Login;
