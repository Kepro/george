import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

type HashRouterContextProps = {
  hash: string;
  setHash: (hash: string) => void;
};

export const HashRouterContext = createContext<HashRouterContextProps>({
  hash: "",
  setHash: () => {
    throw Error("Missing HashRouter");
  },
});

/**
 * Retrieves the hash value from the current window location without the leading '#' character.
 *
 * @returns {string} The hash value without the '#' character.
 */
const getHashWithoutHash = (): string => window.location.hash.substring(1);

export const HashRouter: FC<PropsWithChildren> = ({ children }) => {
  const [hash, setHash] = useState(getHashWithoutHash());

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHashWithoutHash());
    };

    // subscribe to hash change listener
    window.addEventListener("hashchange", handleHashChange);

    // unsubscribe from hash change listener on unmount
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSetHash = (newHash: string) => {
    window.location.hash = newHash;
  };

  const context = useMemo(
    (): HashRouterContextProps => ({ hash, setHash: handleSetHash }),
    [hash],
  );

  return (
    <HashRouterContext.Provider value={context}>
      {children}
    </HashRouterContext.Provider>
  );
};
