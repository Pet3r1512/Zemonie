import GoogleSVG from "../svg/GoogleSVG";
import { Button } from "../ui/button";

export default function SignInViaGoogleBtn() {
  return (
    <div className="flex flex-col gap-4 relative z-1">
      <p className="absolute -top-3 z-100 -right-4.5 text-white rounded-2xl font-semibold text-xs bg-blue-400 px-1.5 py-0.5">
        Coming Soon
      </p>
      <Button type="button" disabled variant="outline" className="w-full">
        <GoogleSVG />
        Login with Google
      </Button>
    </div>
  );
}
