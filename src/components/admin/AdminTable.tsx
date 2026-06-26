import type { ReactNode } from "react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import type { AdminCellAlign, AdminTableColumn } from "@/lib/admin/types";
import { cn } from "@/lib/admin/utils";

type AdminTableProps<Row> = {
  columns: AdminTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string | number;
  empty?: ReactNode;
  caption?: ReactNode;
  className?: string;
  dense?: boolean;
};

const ALIGN_CLASSES: Record<AdminCellAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function alignClass(align: AdminCellAlign | undefined): string {
  return ALIGN_CLASSES[align ?? "left"];
}

function renderCell<Row>(row: Row, key: string): ReactNode {
  const value = (row as Record<string, unknown>)[key];

  if (value === null || value === undefined) return "—";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return null;
}

export function AdminTable<Row>({
  columns,
  rows,
  getRowKey,
  empty,
  caption,
  className,
  dense = false,
}: AdminTableProps<Row>) {
  if (rows.length === 0) {
    return (
      <>
        {empty ?? (
          <AdminEmptyState
            title="Nothing here yet"
            description="There are no records to display."
          />
        )}
      </>
    );
  }

  const cellPad = dense ? "px-3 py-2" : "px-4 py-3";

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-zinc-800",
        className
      )}
    >
      <table className="w-full min-w-full border-collapse text-left text-sm">
        {caption ? (
          <caption className="px-4 py-2 text-left text-xs text-zinc-500">
            {caption}
          </caption>
        ) : null}

        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  "text-xs font-medium uppercase tracking-wide text-zinc-400",
                  cellPad,
                  alignClass(col.align),
                  col.hideOnMobile && "hidden sm:table-cell",
                  col.headerClassName
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800/80">
          {rows.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className="bg-zinc-900/30 transition-colors hover:bg-zinc-800/40"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "align-middle text-zinc-300",
                    cellPad,
                    alignClass(col.align),
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.className
                  )}
                >
                  {col.render ? col.render(row, index) : renderCell(row, col.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
