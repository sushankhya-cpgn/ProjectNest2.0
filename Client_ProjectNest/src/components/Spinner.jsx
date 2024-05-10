import { ImSpinner3 } from "react-icons/im";

function Spinner() {
  return (
    <div className="SpinnerConatainer flex flex-col justify-center items-center">
      <ImSpinner3 className="w-24 h-24 mx-auto text-text animate-spin-slow" />
      <h4 className="text-xl text-text mx-auto p-4">Loading....</h4>
    </div>
  );
}

export default Spinner;
