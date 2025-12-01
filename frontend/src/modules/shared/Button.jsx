const Button = (props) => {
  const { text, onClick, children, className, style, type, disabled } = props;
  return (
    <button
      type={type}
      className={className ? "btn " + className : "btn"}
      disabled={disabled || false}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      style={style}
    >
      {children || text}
    </button>
  );
};

export default Button;
