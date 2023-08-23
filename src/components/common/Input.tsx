import { forwardRef, HTMLProps } from "react";
import cn from "classnames";

type Props = HTMLProps<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      className={cn(
        "block w-full bg-white transition-all rounded px-2 py-1 border outline-none hover:border-blue-400 focus:border-blue-400",
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={ref}
    />
  );
});

export default Input;
