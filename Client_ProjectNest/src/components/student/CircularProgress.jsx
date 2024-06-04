import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;

export default function CircularProgress() {
  return (
    <div>
      <CircularProgressbar
        className="w-6 h-6"
        value={percentage}
        text={`${percentage}%`}
      />
    </div>
  );
}
