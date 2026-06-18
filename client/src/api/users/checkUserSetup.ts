import { SERVER_URL, } from "@/constant/auth";

export class SetupCheckError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message,);
    this.name = "SetupCheckError";
  }
}

export default async function checkUserSetup(): Promise<{ isSetupDone: boolean; }> {
  const res = await fetch(`${SERVER_URL}/api/users/me`, {
    credentials: "include",
  },);

  if (!res.ok) {
    throw new SetupCheckError(`Server returned ${res.status}`, res.status,);
  }

  const data = await res.json();

  if (typeof data.isSetupDone !== "boolean") {
    throw new Error("Invalid response: missing isSetupDone",);
  }

  return data;
}
