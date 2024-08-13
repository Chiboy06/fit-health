import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { DoctorColumns } from "@/components/table/DoctorsColumns";
import { DoctorTable } from "@/components/table/DoctorTable";
import { getRecentDoctorsList } from "@/lib/actions/doctor.actions";

const DoctorPage = async () => {
  const doctors = await getRecentDoctorsList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link
          href="/"
          className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <div className="flex space-x-3">
          <Link
            href="/admin"
            className="text-16-semibold cursor-pointer text-gray-200">
            Admin Dashboard
          </Link>
          <Link
            href="/admin/doctors"
            className="text-16-semibold cursor-pointer text-green-200">
            Staffs
          </Link>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Staff List</h1>
          <p className="text-dark-700">Hello there, Staff List</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="doctors"
            count={doctors.totalCount}
            label="Doctors"
          />
        </section>

        <DoctorTable
          columns={DoctorColumns}
          data={doctors.documents}
        />
      </main>
    </div>
  );
};

export default DoctorPage;
