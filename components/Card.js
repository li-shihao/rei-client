export const Card = (props) => {
  const defaultProps =
    "py-8 w-full mt-4 border border-black rounded-2xl flex justify-center items-center ";
  const finalProps = defaultProps + props.className;
  return (
    <div className={finalProps}>
      {props.wide ? (
        <div className="w-11/12 border border-gray-300">{props.children}</div>
      ) : (
        <div className="w-4/5 border border-gray-300">{props.children}</div>
      )}
    </div>
  );
};

export const CardTitle = (props) => {
  const defaultProps = "text-3xl border border-gray-300 my-2 ";
  const finalProps = defaultProps + props.className;
  return <h1 className={finalProps}>{props.children}</h1>;
};

export const CardDescription = (props) => {
  const defaultProps = "border border-gray-300 my-2 ";
  const finalProps = defaultProps + props.className;
  return <p className={finalProps}>{props.children}</p>;
};
