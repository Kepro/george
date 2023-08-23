import { useErrorBoundary } from "react-error-boundary";
import { FC } from "react";
import { Box } from "./Box";

type Props = {
  error: Error;
};

export const ErrorFallback: FC<Props> = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Box role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button type="button" onClick={resetBoundary}>
        Try again
      </button>
    </Box>
  );
};
