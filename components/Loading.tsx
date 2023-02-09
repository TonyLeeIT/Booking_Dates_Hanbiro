import FadeLoader from "react-spinners/FadeLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="z-100 absolute top-1/3 left-1/2">
      <FadeLoader
        color="rgb(157 23 77)"
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h2 className="font-semibold">Loading....</h2>
    </div>
  );
};

export default Loading;
