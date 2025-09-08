import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";

export default function UrlList({ items }) {
  if (!items.length) return null;
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell align="right">Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((r) => (
            <TableRow key={r.short}>
              <TableCell>
                <Link href={`/${r.short}`} target="_blank" rel="noreferrer">
                  {window.location.origin + "/" + r.short}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={r.url} target="_blank" rel="noreferrer">{r.url}</Link>
              </TableCell>
              <TableCell>
                {r.expiresAt ? new Date(r.expiresAt).toLocaleString() : "Never"}
              </TableCell>
              <TableCell align="right">{r.clicks?.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}