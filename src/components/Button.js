import PropTypes from "prop-types";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: "default-button",
};

export default Button;
