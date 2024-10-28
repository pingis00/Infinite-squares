import PropTypes from "prop-types";

const Button = ({ onClick, label, className = "default-button" }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type="button"
      aria-label={label}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
