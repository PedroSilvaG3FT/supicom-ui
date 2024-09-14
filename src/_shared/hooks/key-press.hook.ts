import { useEffect } from "react";

const useKeyPress = (
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
  targetKey: string,
  onKeyPress: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ref.current &&
        document.activeElement === ref.current &&
        event.key === targetKey
      ) {
        onKeyPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, targetKey, onKeyPress]);
};

export default useKeyPress;
