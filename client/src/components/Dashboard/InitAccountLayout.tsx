/* eslint-disable react-hooks/exhaustive-deps */
import createBalance, { Currency } from "@/api/users/createBalance";
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
    if (mutation.isPending) return;

    mutation.mutate({
      currency: Currency.AUD,
    });
  }, []);

  return (
    <center className="space-y-4 h-full">
      <p className="text-2xl lg:text-3xl font-bold text-primary">Setting Up Your Account</p>
      <p className="text-gray-400 dark:text-gray-300 font-semibold">
        This will only take a moment...
      </p>
      <LoaderCircle size={48} strokeWidth={2.5} className="text-primary animate-spin" />
    </center>
  );
}
