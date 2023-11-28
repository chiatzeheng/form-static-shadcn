import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddCard from "@/components/addcard"
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import type { FormData as Form } from "@/types/types";
import type { FinishedCard } from "@/types/types";
import { useRouter } from "next/router";


export default function Dashboard({ data }: { data: Form[] }) {
  if (!data) {
    return null; 
  }

  return (
    <div className="mt-10 flex-1 p-20">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        {data.map((form) => (
          <div key={form.id} className="w-full sm:w-full lg:w-1-2">
            <FinishedCard formId={form.id} formName={form.name} formDescription={form.description} />
          </div>
        ))}
      <div className="w-full sm:w-full lg:w-1-2">
          <AddCard />
        </div>
      </div>
    </div>
  );
}





function FinishedCard({ formId, formName,  formDescription, answerId }: FinishedCard) {
  const deleteForm = api.form.deleteForm.useMutation();
  const [loading, setLoading] = React.useState(false);
  const utils = api.useUtils()

  const handleDelete = () => {
    try {
      setLoading(true); 

       deleteForm.mutate({ formId },
        {
          onSuccess: () => {
            toast.success("Form Deleted!");
            void utils.form.getAllForms.refetch()
          },
          onError: (e) => {
            toast.error(e.message);
          },
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-80 cursor-pointer transition duration-300 hover:bg-gray-100">
      <Link href={`/forms/${answerId}`} passHref>
        <CardHeader>
          <CardTitle>{formName} </CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="flex flex-end absolute">
        <Button onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}

