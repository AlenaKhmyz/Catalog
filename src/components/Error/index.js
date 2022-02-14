import '../../styles/styles.scss';

const ErrorMessage = ({ errorText }) => {
  return <div className="movies__totalResults__error">{errorText}</div>;
};

export default ErrorMessage;
