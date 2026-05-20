/* eslint-disable react-hooks/exhaustive-deps */
import createBalance, { Currency } from "@/api/users/createBalance";
import useFetchUser from "@/hooks/useFetchUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function InitAccount({
  setCreatingAccount,
}: {
  setCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const userId = useFetchUser();

  const mutation = useMutation({
    mutationKey: ["balance"],
    mutationFn: createBalance,
    onError: (error) => {
      setCreatingAccount(false);
      return toast.error(error.message);
    },
    onSuccess: () => {
      setCreatingAccount(false);
      return router.navigate({ to: "/dashboard" });
    },
  });

  useEffect(() => {
    // prevent creating double records in balance table
    if (!userId) return;
    if (mutation.isPending) return;

    mutation.mutate({
      userId: userId,
      currency: Currency.AUD,
    });
  }, [userId]);

  return (
    <center className="space-y-4 h-full">
      <p className="text-2xl lg:text-3xl font-bold text-primary">
        Setting Up Your Account
      </p>
      <p className="text-gray-400 font-semibold">
        This will only take a moment...
      </p>
      <LoaderCircle
        size={48}
        strokeWidth={2.5}
        className="text-primary animate-spin"
      />
    </center>
  );
}
