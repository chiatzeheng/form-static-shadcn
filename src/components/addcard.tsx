import * as React from "react";
import {
  Card,
  CardContent,
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
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";


export default function AddCard() {
  const [name, setName] = React.useState("Add Form");
  const [description, setDescription] = React.useState<string>("Enter a Description!");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const createForm = api.form.createForm.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading state to true on form submission

      const { id } = await createForm.mutateAsync(
        { name, description },
        {
          onSuccess: ({ id }) => {
            router.push(`/forms/${id}`).catch(console.error);
            toast.success("Form created!");
          },
          onError: (e) => {
            toast.error(e.message);
          },
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false); 
    }
  };
    return (
      <Dialog >
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
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name"className="col-span-3"            
              value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input id="username" className="col-span-3"   value={description}  onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
        <Button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    }