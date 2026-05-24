import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const currencyLists: {
  code: string;
  name: string;
  img: string;
}[] = [
  {
    code: "AUD",
    name: "Australia Dollar - AUD",
    img: "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/au.png",
  },
  {
    code: "USD",
    name: "US Dollar - USD",
    img: "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/us.png",
  },
  {
    code: "VND",
    name: "Vietname Dong - VND",
    img: "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/vn.png",
  },
];

export default function AccountSetupForm({
  className,
}: {
  className?: string;
}) {
  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //   } = useForm<{}>();
  return (
    <div
      data-testid="signup-form-container"
      className={cn(
        "flex flex-col gap-6 w-full md:max-w-106.25 lg:max-w-lg",
        className,
      )}
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <div className="flex items-center gap-x-2.5 cursor-default">
            <img
              src="/logo/zemonie-icon-light.svg"
              alt=""
              className="w-auto h-8"
            />
            <p
              data-testid="brand-name"
              className="font-semibold text-primary text-lg"
            >
              Zemonie
            </p>
          </div>
          <CardTitle className="text-xl lg:text-2xl text-primary-dark">
            Account Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            role="form"
            //   onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-6">
              {/* <div className="grid gap-3">
                <Label htmlFor="language">Language</Label>
                <Select
                  onValueChange={() => {
                    // setValue("categoryId", +value);
                  }}
                  defaultValue="english"
                >
                  <SelectTrigger id="source" name="source" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white w-full">
                    <SelectGroup>
                      <SelectItem
                        key="english"
                        className="lg:hover:bg-gray-200"
                        value={"english"}
                      >
                        English
                      </SelectItem>
                      <SelectItem
                        key="vietnamese"
                        className="lg:hover:bg-gray-200"
                        value={"vietnamese"}
                        disabled
                      >
                        <div>Vietnamese</div>
                        <p className="absolute top-1.5 right-3 z-100 text-white rounded-2xl font-semibold text-xs bg-blue-400 px-1.5 py-0.5">
                          Coming Soon
                        </p>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="grid gap-3">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  onValueChange={() => {
                    // setValue("categoryId", +value);
                  }}
                  defaultValue="english"
                >
                  <SelectTrigger id="source" name="source" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white w-full">
                    <SelectGroup>
                      {currencyLists.map((currency) => {
                        return (
                          <SelectItem
                            key={currency.code}
                            className="lg:hover:bg-gray-200"
                            value={currency.code}
                            disabled={currency.code === "VND"}
                          >
                            <div className="flex gap-x-2">
                              <img
                                src={currency.img}
                                alt={currency.name}
                                className="rounded-full object-contain"
                              />
                              <p>{currency.name}</p>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
