import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

export function AddFile() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setFiles(null);
    setLoading(false);
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!files) return;

    const file = files[0];

    console.log({ file });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
      {
        fileName: file.name,
        contentType: file.type,
      }
    );

    setLoading(true);

    axios
      .put(res.data.presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      })
      .then((res) => {
        if (res) {
          setSuccess(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log({ files });
    console.log(files?.[0]?.size);
  }, [files]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Adicionar arquivo</Button>
      </DrawerTrigger>
      <DrawerContent onCloseAutoFocus={resetState}>
        <div className="mx-auto max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicionar arquivo</DrawerTitle>
            <DrawerDescription>
              Arraste seus arquivos para a área de transferência
            </DrawerDescription>
          </DrawerHeader>
          <Dropzone onDrop={(acceptedFiles: any) => setFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="bg-white hover:bg-slate-100 pointer flex justify-center items-center p-4 h-[150px] border border-dashed">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    {files?.[0] ? files?.[0]?.name : "Área de transferência"}
                  </p>
                  {loading && <p>Enviando...</p>}
                  {success && <p>Arquivo enviado com sucesso!</p>}
                </div>
              </section>
            )}
          </Dropzone>
          <DrawerFooter className="flex flex-row">
            <DrawerClose asChild>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Enviar
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
