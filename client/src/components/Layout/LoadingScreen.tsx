import { Atom } from "react-loading-indicators";

export default function LoadingScreen() {
  return (
    <div
      data-testid="loading-screen"
      className="w-screen h-screen flex items-center justify-center"
    >
      <Atom color="#ff7900" size="medium" text="" textColor="" />
    </div>
  );
}
