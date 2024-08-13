"use client";

import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";

function SideBar() {
  const router = useRouter();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="text-gray-100" />
        </SheetTrigger>
        <SheetContent className="bg-slate-900">
          <SheetHeader>
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
          </SheetHeader>
          {/* Links */}
          <div className="flex flex-col gap-5 text-left">
            <div className="flex ">
              <Button
                variant="link"
                onClick={() => router.push("/admin")}
                className="w-full content-start border text-gray-100">
                Dashboard
              </Button>
            </div>
            <Button
              variant="link"
              onClick={() => router.push("/admin/doctors")}
              className="w-full border text-left text-gray-100 hover:bg-green-200">
              Doctors
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideBar;
