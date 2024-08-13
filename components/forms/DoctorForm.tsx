"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DoctorSpecialist,
  GenderOptions,
  TypeOptions,
  IdentificationTypes,
  DoctorFormDefaultValues,
} from "@/constants";
import { registerDoctor } from "@/lib/actions/doctor.actions";
import { DoctorFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import { PictureUploader } from "../PictureUploader";
import SubmitButton from "../SubmitButton";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function DoctorForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [workingHours, setWorkingHours] = useState<string[]>([]);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: DoctorFormDefaultValues,
  });

  const handleSwitchChange = (day: string, checked: boolean) => {
    setWorkingHours((prev) => {
      if (checked) {
        return [...prev, day];
      } else {
        return prev.filter((item) => item !== day);
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);

    const formData = new FormData();
    const profilePics = new FormData();

    // Handling identification document
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    // Handling profile picture (second file)
    if (values.profilePicture && values.profilePicture.length > 0) {
      const profileBlobFile = new Blob([values.profilePicture[0]], {
        type: values.profilePicture[0].type,
      });
      profilePics.append("profileBlobFile", profileBlobFile); // Use a unique key for the profile picture
      profilePics.append("profileFileName", values.profilePicture[0].name); // Use a unique key for the filename
    }

    try {
      const userId = crypto.randomUUID();
      const doctor = {
        userId,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        specialist: values.specialist,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        workingHours,
        address: values.address,
        type: values.type,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        allergies: values.allergies,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        profilePicture: values.profilePicture ? profilePics : undefined,
      };

      const newDoctor = await registerDoctor(doctor);

      if (newDoctor) {
        router.push(`/admin/doctors`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // toast.warn(error);
      alert({ error });
      // Add user feedback here, such as a toast or error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="size-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="bg-dark-200">
            Create Doctor
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto bg-dark-200 text-gray-100">
          <SheetHeader>
            <SheetTitle className="mb-6 mt-2">
              <h1>Add New Doctor Staff</h1>
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-6">
              {formStep === 1 && (
                <>
                  <div className="flex space-x-2">
                    <div>
                      <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="profilePicture"
                        renderSkeleton={(field) => (
                          <FormControl className="m-0">
                            <PictureUploader
                              files={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-sm text-green-200">
                        <span className="font-bold text-green-900">Upload</span>{" "}
                        Photo
                      </h1>
                      <p className="text-xs text-gray-200">
                        An image of the person
                      </p>
                    </div>
                  </div>

                  <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="type"
                    label="Type"
                    renderSkeleton={(field) => (
                      <FormControl>
                        <RadioGroup
                          className="flex h-11 gap-6 xl:justify-between"
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          {TypeOptions.map((option, i) => (
                            <div
                              key={option + i}
                              className="radio-group">
                              <RadioGroupItem
                                value={option}
                                id={option}
                              />
                              <Label
                                htmlFor={option}
                                className="cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                  />
                  {/* BirthDate & Gender */}
                  <div className="flex flex-col gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.DATE_PICKER}
                      control={form.control}
                      name="birthDate"
                      label="Date of birth"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="gender"
                      label="Gender"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <RadioGroup
                            className="flex h-11 gap-6 xl:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            {GenderOptions.map((option, i) => (
                              <div
                                key={option + i}
                                className="radio-group">
                                <RadioGroupItem
                                  value={option}
                                  id={option}
                                />
                                <Label
                                  htmlFor={option}
                                  className="cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </div>

                  {/* specialization */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="specialist"
                    label="Specialist"
                    placeholder="Select  specialist  doctor">
                    {DoctorSpecialist.map((type, i) => (
                      <SelectItem
                        key={type + i}
                        value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </CustomFormField>

                  <div className="flex w-full justify-end gap-4 font-semibold">
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-4 text-white">
                        Cancel
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(2)}>
                      Next
                    </Button>
                  </div>
                </>
              )}

              {formStep === 2 && (
                <>
                  {/* Phone */}
                  <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                  />
                  {/* email */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                  />

                  {/* address */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="14 street, New york, NY - 5101"
                  />

                  {/* Emergency Contact Name & Emergency Contact Number */}
                  <div className="flex flex-col gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="emergencyContactName"
                      label="Emergency contact name"
                      placeholder="Guardian's name"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={form.control}
                      name="emergencyContactNumber"
                      label="Emergency contact number"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="flex w-full justify-end gap-4 font-semibold">
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-4 text-white">
                        Cancel
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(1)}>
                      Previous
                    </Button>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(3)}>
                      Next
                    </Button>
                  </div>
                </>
              )}

              {formStep === 3 && (
                <div className="h-auto w-full">
                  <section className="my-4 space-y-6">
                    <div className="mb-9 space-y-1">
                      <h2 className="sub-header">Medical Information</h2>
                    </div>
                    {/* ALLERGY */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Penicillin, Pollen"
                      />
                    </div>

                    {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                    <div className="flex flex-col gap-6">
                      <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label=" Family medical history (if relevant)"
                        placeholder="Mother had brain cancer, Father has hypertension"
                      />

                      <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
                      />
                    </div>
                  </section>

                  <div className="flex w-full justify-end gap-4 py-4 font-semibold">
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-4 text-white">
                        Cancel
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(2)}>
                      Previous
                    </Button>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(4)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div>
                  <section className="my-4 space-y-6">
                    <div className="mb-9 space-y-1">
                      <h2 className="sub-header">
                        Identification and Verfication
                      </h2>
                    </div>

                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="identificationType"
                      label="Identification Type"
                      placeholder="Select identification type">
                      {IdentificationTypes.map((type, i) => (
                        <SelectItem
                          key={type + i}
                          value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </CustomFormField>

                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="identificationNumber"
                      label="Identification Number"
                      placeholder="123456789"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="identificationDocument"
                      label="Scanned Copy of Identification Document"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <FileUploader
                            files={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      )}
                    />
                  </section>
                  <div className="flex w-full justify-end gap-4 py-4 font-semibold">
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-4 text-white">
                        Cancel
                      </Button>
                    </SheetClose>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(3)}>
                      Previous
                    </Button>
                    <Button
                      type="button"
                      className="shad-primary-btn px-4"
                      onClick={() => setFormStep(5)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {formStep === 5 && (
                <div className="space-y-6">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <CustomFormField
                      key={day.length}
                      fieldType={FormFieldType.SWITCH}
                      control={form.control}
                      name={day}
                      description={day}
                      handleSwitchChange={handleSwitchChange}
                    />
                  ))}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4"
                      onClick={() => setFormStep(4)}>
                      Previous
                    </Button>
                    <SubmitButton isLoading={isLoading}>Save</SubmitButton>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </SheetContent>
      </Sheet>
      {/* <ToastContainer position="top-left" /> */}
    </div>
  );
}

export default DoctorForm;
