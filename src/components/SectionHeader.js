import PropTypes from "prop-types";

const SectionHeader = ({ title, subtitle, imgSrc, imgAlt }) => {
  return (
    <section className="section-header">
      <div className="header-title">
        {imgSrc && <img src={imgSrc} alt={imgAlt} className="logo" />}
        <h1>{title}</h1>
      </div>
      <div>{subtitle && <h2>{subtitle}</h2>}</div>
    </section>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
};

export default SectionHeader;
