import "./StatusDisplay.scss";

const StatusDisplay = ({children, status}) => {
  if(status) {
    return (
      <p className={`status-display ${status}`}>{children}</p>
    )
  }
};

export default StatusDisplay;