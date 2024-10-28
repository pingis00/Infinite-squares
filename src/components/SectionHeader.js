import PropTypes from "prop-types";

const SectionHeader = ({ title, subtitle, imgSrc, imgAlt = "" }) => {
  return (
    <header className="section-header">
      <div className="header-title">
        {imgSrc && <img src={imgSrc} alt={imgAlt} className="logo" />}
        <h1>{title}</h1>
      </div>
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
};

export default SectionHeader;
