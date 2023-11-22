import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/utils/api";
import { Form } from "@/components/ui/form";


export default function Dashboard() {
  const [forms, setForms] = React.useState([1, 2, 3]);
  const { mutate: createForm } = api.form.createForm.useMutation();

  function handleCreateForm() {
    const formdata = { id: uuidv4(), name: "New Form", fields: [] };
    setForms((forms) => [...forms, newFormId]);
    createForm(newFormId);
  }

  return (
    <div className="mt-10 flex-1 p-20">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        {forms.map((formId) => (
          <div key={formId} className="w-full sm:w-full md:w-1/2 lg:w-1/4">
            <FinishedCard formId={formId} />
          </div>
        ))}
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/4">
          <AddCard />
        </div>
      </div>
    </div>
  );
}

function FinishedCard({ formId }: { formId: number }) {
  return (
    <Link href={`/forms/${formId}`} passHref>
      <Card className="h-80 cursor-pointer transition duration-300 hover:bg-gray-100">
        <CardHeader>
          <CardTitle>BE Form </CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>{formId}</CardContent>
      </Card>
    </Link>
  );
}

function AddCard() {

  function onSubmit(event) {
    event.preventDefault();
    console.log("submit");
  }

  return (
    <Dialog >
      <form onSubmit={onSubmit}>
      <DialogTrigger asChild>
        <Card
          className="flex h-80 cursor-pointer items-center justify-center border-2 border-dashed border-gray-300"
        >
          <CardContent>+</CardContent>
        </Card>
      </DialogTrigger>{" "}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Form</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
      </form>
    </Dialog>
  );
}
