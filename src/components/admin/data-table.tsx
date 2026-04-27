import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DataTableProps<T> = {
  headers: string[];
  rows: T[];
  renderRow: (row: T) => ReactNode;
  emptyText?: string;
};

export function DataTable<T>({ headers, rows, renderRow, emptyText = "No records found." }: DataTableProps<T>) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row, idx) => <TableRow key={idx}>{renderRow(row)}</TableRow>)
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center text-sm text-muted-foreground">
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
