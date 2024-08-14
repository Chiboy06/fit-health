import Header from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { DoctorColumns } from "@/components/table/DoctorsColumns";
import { DoctorTable } from "@/components/table/DoctorTable";
import { getRecentDoctorsList } from "@/lib/actions/doctor.actions";

const DoctorPage = async () => {
  const doctors = await getRecentDoctorsList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

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
