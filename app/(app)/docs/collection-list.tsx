import Link from "next/link";

import { Frame } from "@/components/ui/coss-ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/coss-ui/table";
import { CollectionsProps } from "@/lib/data/collections/get-collections";

interface CollectionListProps {
  collectionsData: CollectionsProps[];
}

export function CollectionList(props: CollectionListProps) {
  return (
    <Frame className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Collection</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.collectionsData.map((collection) => (
            <TableRow key={collection.id} className="relative cursor-pointer">
              <TableCell className="font-medium">
                <Link
                  href={`/docs/${collection.slug}`}
                  className="absolute inset-0"
                />
                {collection.title}
              </TableCell>
              <TableCell>{collection.slug}</TableCell>
              <TableCell>{collection.filesCount}</TableCell>
              <TableCell className="text-right">
                {collection.createdAt.toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Collections</TableCell>
            <TableCell className="text-right">
              {props.collectionsData.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Frame>
  );
}
