import Link from "next/link";

import { Frame } from "@/components/ui/coss-ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/coss-ui/table";
import { DocumentsProps } from "@/lib/data/documents/get-documents";

interface DocumentListProps {
  documentsData: DocumentsProps[];
}

export function DocumentList(props: DocumentListProps) {
  return (
    <Frame className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Collection</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.documentsData.map((document) => (
            <TableRow key={document.id} className="relative cursor-pointer">
              <TableCell className="font-medium">
                <Link
                  href={`/docs/${document.collectionSlug}/${document.slug}`}
                  className="absolute inset-0"
                />
                {document.title}
              </TableCell>
              <TableCell>{document.slug}</TableCell>
              <TableCell>{document.collectionTitle}</TableCell>
              <TableCell className="text-right">
                {document.createdAt.toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Frame>
  );
}
