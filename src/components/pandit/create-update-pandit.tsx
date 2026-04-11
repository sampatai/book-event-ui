"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IPanditCreateUpdate } from "@/lib/interface/IPandit";

interface CreateEditPanditProps {
  defaultValues?: IPanditCreateUpdate;
  onSubmit: SubmitHandler<IPanditCreateUpdate>;
}

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(3, "Postal code is too short"),
  country: z.string().min(1, "Country is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
});

const PanditCreateUpdateSchema = z.object({
  userId: z.number().int().positive(),
  fullName: z.string().min(5, "Full name must be at least 5 characters"),
  languages: z.string().min(1, "Languages is required"),
  experienceInYears: z.number().min(0, "Experience must be 0 or more"),
  address: addressSchema,
});

export type CreateUpdateFormModel = z.infer<typeof PanditCreateUpdateSchema>;

export function CreateEditPandit({
  defaultValues,
  onSubmit,
}: Readonly<CreateEditPanditProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUpdateFormModel>({
    mode: "onSubmit",
    defaultValues: {
      userId: 1,
      ...defaultValues,
    },
    resolver: zodResolver(PanditCreateUpdateSchema),
  });

  return (
    <form
      id="form-pandit-create"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pandit Details</CardTitle>
          <CardDescription>Basic profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field data-invalid={!!errors.fullName} className="md:col-span-2">
              <FieldLabel htmlFor="form-fullName">Full Name</FieldLabel>
              <Input
                id="form-fullName"
                placeholder="Enter full name"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
              {errors.fullName && <FieldError errors={[errors.fullName]} />}
            </Field>

            <Field data-invalid={!!errors.languages} className="md:col-span-2">
              <FieldLabel htmlFor="form-languages">Languages</FieldLabel>
              <Input
                id="form-languages"
                placeholder="Nepali, English"
                aria-invalid={!!errors.languages}
                {...register("languages")}
              />
              {errors.languages && <FieldError errors={[errors.languages]} />}
            </Field>

            <Field data-invalid={!!errors.experienceInYears}>
              <FieldLabel htmlFor="form-experience">
                Experience (Years)
              </FieldLabel>
              <Input
                id="form-experience"
                type="number"
                min={0}
                placeholder="0"
                aria-invalid={!!errors.experienceInYears}
                {...register("experienceInYears", { valueAsNumber: true })}
              />
              {errors.experienceInYears && (
                <FieldError errors={[errors.experienceInYears]} />
              )}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>
            Location and contact address details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              data-invalid={!!errors.address?.addressLine1}
              className="md:col-span-2"
            >
              <FieldLabel htmlFor="form-addressLine1">
                Address Line 1
              </FieldLabel>
              <Input
                id="form-addressLine1"
                placeholder="House no, street name"
                aria-invalid={!!errors.address?.addressLine1}
                {...register("address.addressLine1")}
              />
              {errors.address?.addressLine1 && (
                <FieldError errors={[errors.address.addressLine1]} />
              )}
            </Field>

            <Field
              data-invalid={!!errors.address?.addressLine2}
              className="md:col-span-2"
            >
              <FieldLabel htmlFor="form-addressLine2">
                Address Line 2 (Optional)
              </FieldLabel>
              <Input
                id="form-addressLine2"
                placeholder="Apartment, landmark"
                aria-invalid={!!errors.address?.addressLine2}
                {...register("address.addressLine2")}
              />
              {errors.address?.addressLine2 && (
                <FieldError errors={[errors.address.addressLine2]} />
              )}
            </Field>

            <Field data-invalid={!!errors.address?.street}>
              <FieldLabel htmlFor="form-street">Street</FieldLabel>
              <Input
                id="form-street"
                placeholder="Street"
                aria-invalid={!!errors.address?.street}
                {...register("address.street")}
              />
              {errors.address?.street && (
                <FieldError errors={[errors.address.street]} />
              )}
            </Field>

            <Field data-invalid={!!errors.address?.city}>
              <FieldLabel htmlFor="form-city">City</FieldLabel>
              <Input
                id="form-city"
                placeholder="City"
                aria-invalid={!!errors.address?.city}
                {...register("address.city")}
              />
              {errors.address?.city && (
                <FieldError errors={[errors.address.city]} />
              )}
            </Field>

            <Field data-invalid={!!errors.address?.state}>
              <FieldLabel htmlFor="form-state">State</FieldLabel>
              <Input
                id="form-state"
                placeholder="State"
                aria-invalid={!!errors.address?.state}
                {...register("address.state")}
              />
              {errors.address?.state && (
                <FieldError errors={[errors.address.state]} />
              )}
            </Field>

            <Field data-invalid={!!errors.address?.postalCode}>
              <FieldLabel htmlFor="form-postalCode">Postal Code</FieldLabel>
              <Input
                id="form-postalCode"
                placeholder="Postal code"
                aria-invalid={!!errors.address?.postalCode}
                {...register("address.postalCode")}
              />
              {errors.address?.postalCode && (
                <FieldError errors={[errors.address.postalCode]} />
              )}
            </Field>

            <Field
              data-invalid={!!errors.address?.country}
              className="md:col-span-2"
            >
              <FieldLabel htmlFor="form-country">Country</FieldLabel>
              <Input
                id="form-country"
                placeholder="Country"
                aria-invalid={!!errors.address?.country}
                {...register("address.country")}
              />
              {errors.address?.country && (
                <FieldError errors={[errors.address.country]} />
              )}
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              type="submit"
              form="form-pandit-create"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
