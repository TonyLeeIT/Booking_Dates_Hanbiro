import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

type Props = {};

const Header = (props: Props) => {
  const route = useRouter();

  const signOut = (): void => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    route.push("/login");
  };
  const { user } = useStateContext();
  return (
    <div className="md:text-white flex justify-end p-4">
      {" "}
      <ul className="space-x-5 md:space-x-10 flex">
        <li className="headerLink">{user.displayName}</li>
        <div className="flex">
          {" "}
          <li>Sign Out</li>
          <ExitToAppIcon className="headerLink" onClick={signOut} />
        </div>
      </ul>
    </div>
  );
};

export default Header;
