import { FilesList } from "@/components/structures/FilesList/index";

export default function FilesPage() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="bg-slate-100 rounded min-h-[500px]">
        <FilesList />
      </div>
    </main>
  );
}
