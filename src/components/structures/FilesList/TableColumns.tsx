import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DeleteFileDialog } from "./DeleteFile";

export const columns: ColumnDef<File | any>[] = [
  {
    id: "id",
    accessorKey: "id",
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome arquivo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="">{date.toDateString()}</div>;
    },
  },
  {
    accessorKey: "contentType",
    header: () => {
      return <p>Tipo de arquivo</p>;
    },
    cell: ({ row }) => <div className="">{row.getValue("contentType")}</div>,
  },
  {
    accessorKey: "url",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button variant="outline">
          <Link target="_blank" href={row.getValue("url")}>
            Baixar
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "key",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DeleteFileDialog fileKey={row.getValue("key")} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
