"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// import { Doctors } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
// import { formatDateTime } from "@/lib/utils";
import { Doctor } from "@/types/appwrite.types";

// import { AppointmentModal } from "../AppointmentModal";
// import { StatusBadge } from "../StatusBadge";

export const DoctorColumns: ColumnDef<Doctor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "profilePictureUrl",
    header: "NAME",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={`${doctor.profilePictureUrl}`}
            alt="doctor"
            width={100}
            height={100}
            className="size-8 rounded-full "
            priority
          />
          <div>
            <p className="whitespace-nowrap text-sm font-semibold">
              Dr. {doctor?.fullName}
            </p>
            <p className="whitespace-nowrap text-xs font-normal text-gray-400">
              {doctor?.specialist}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "CONTACT",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <div className="flex flex-col px-2">
          <p className="text-14-medium font-bold">{doctor.phone}</p>
          <p className="font-semibold text-blue-400">{doctor.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const doctor = row.original;
      return <p className="text-14-medium">{doctor.email}</p>;
    },
  },
  {
    accessorKey: "workingHours",
    header: "Working Hours",
    cell: ({ row }) => {
      const doctor = row.original;
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      return (
        <div className="text-14-medium">
          {daysOfWeek.map((day) => {
            const isDayPresent = doctor.workingHours?.includes(day);
            const dayColorClass = isDayPresent
              ? "text-white py-2 px-3 rounded-full mx-1 bg-blue-400"
              : "text-black py-2 px-3 mx-1 rounded-full bg-gray-200";
            return (
              <span
                key={day}
                className={dayColorClass}>
                {day.charAt(0)}
              </span>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const doctor = row.original;
      if (doctor.type === "Full-Time")
        return (
          <p className="text-14-medium rounded-lg border bg-green-200 p-2 text-green-800">
            {doctor.type}
          </p>
        );
      else
        return (
          <p className="text-14-medium rounded-lg border bg-yellow-200 p-3 text-yellow-400">
            {doctor.type}
          </p>
        );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      //   const appointment = row.original;

      return (
        <h1>Actions</h1>
        // <div className="flex gap-1">
        //   <AppointmentModal
        //     patientId={appointment.patient.$id}
        //     userId={appointment.userId}
        //     appointment={appointment}
        //     type="schedule"
        //     title="Schedule Appointment"
        //     description="Please confirm the following details to schedule."
        //   />
        //   <AppointmentModal
        //     patientId={appointment.patient.$id}
        //     userId={appointment.userId}
        //     appointment={appointment}
        //     type="cancel"
        //     title="Cancel Appointment"
        //     description="Are you sure you want to cancel your appointment?"
        //   />
        // </div>
      );
    },
  },
];
