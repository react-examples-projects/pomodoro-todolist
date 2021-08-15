import MoonLoader from "react-spinners/MoonLoader";

function LoaderPage() {
  return (
    <div className="loader-page">
      <MoonLoader color="#000" loading={true} size={40} />
    </div>
  );
}

export default LoaderPage;
