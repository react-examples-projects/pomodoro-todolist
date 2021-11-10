import MoonLoader from "react-spinners/MoonLoader";
import { getTheme } from "../../Helpers/utils";

function LoaderPage() {
  const theme = getTheme();
  const color = theme === "dark" ? "#fff" : "#000";
  
  return (
    <div className="loader-page">
      <MoonLoader color={color} loading={true} size={40} />
    </div>
  );
}

export default LoaderPage;
