export const Button = (props) => {
  const defaultProps = "border border-black text-lg px-5 py-1 rounded-md ";
  const finalProps = defaultProps + props.className;
  return (
    <button className={finalProps} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
