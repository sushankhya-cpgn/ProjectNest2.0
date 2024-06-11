import PropTypes from "prop-types"; // Import PropTypes
function StdProjectLogo({ projectDetails, isLoading }) {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <img className="h-[25px]" alt="logo" src="/logo_light2.png"></img>
      <span className={`text-text text-[20px]`}>{projectDetails}</span>
    </div>
  );
}

StdProjectLogo.propTypes = {
  size: PropTypes.number,
};

export default StdProjectLogo;