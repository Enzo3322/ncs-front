import { FilesList } from "@/components/structures/FilesList/index";

export default function FilesPage() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-[#25266a]">
      <div className="bg-slate-100 rounded min-h-[500px] max-w-screen-xl w-full px-4">
        <FilesList />
      </div>
    </main>
  );
}
