import clsx from "clsx";
import Image from "next/image";
import { Stethoscope } from 'lucide-react';

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "doctors";
  count: number;
  label: string;
  icon?: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments" || type === "doctors",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}>
        {type === "doctors" ? (
          <div className="flex items-center gap-4">
            <Stethoscope /> 
            <h2 className="text-32-bold text-white">{count}</h2>
            <p className="text-14-regular">{label}</p>
          </div>
        ): (
          <>
            <div
              className={clsx("flex items-center gap-4")}>
              <Image
                src={icon}
                height={32}
                width={32}
                alt="appointments"
                className="size-8 w-fit"
              />
              <h2 className="text-32-bold text-white">{count}</h2>
            </div>

            <p className="text-14-regular">{label}</p>
          </>
          )
        }
    </div>
  );
};
