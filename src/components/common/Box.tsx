import { FC, HTMLProps, PropsWithChildren } from "react";
import cn from "classnames";

export const Box: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-center rounded shadow p-5 bg-white",
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </div>
  );
};
