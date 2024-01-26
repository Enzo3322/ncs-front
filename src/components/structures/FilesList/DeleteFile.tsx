import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface DeleteFileDialogProps {
  fileKey: string;
}

export function DeleteFileDialog({ fileKey }: DeleteFileDialogProps) {
  const handleDelete = async () => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/uploads/${fileKey}`,
      {
        withCredentials: true,
      }
    );

    if (res.status !== 204) {
      toast({
        title: "Erro ao deletar arquivo",
        description: "Tente novamente mais tarde",
        duration: 5000,
      });
      return;
    }

    toast({
      title: "Arquivo deletado com sucesso",
      description: "O arquivo foi deletado com sucesso!",
      duration: 5000,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Deletar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar arquivo</DialogTitle>
          <DialogDescription>
            Essa ação é irreversível, tem certeza que deseja deletar o arquivo?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="bg-red-600"
            onDoubleClick={handleDelete}
            type="submit"
          >
            DELETAR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
