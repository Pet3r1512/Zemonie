import { SERVER_URL } from "@/constant/auth";

export default async function getGlobalCategories() {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/categories.getGlobalCategories`,
    {
      method: "GET",
    },
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error.message || "Unknown Error");
  }

  return {
    success: true,
    globalCategories: res.result.data,
  };
}
