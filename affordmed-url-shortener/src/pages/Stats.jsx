import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { list } from "../lib/storage";

export default function Stats() {
  const rows = list();
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Short Links Statistics
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell align="right">Total Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.short} hover>
                <TableCell>{window.location.origin + "/" + r.short}</TableCell>
                <TableCell>{r.url}</TableCell>
                <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {r.expiresAt
                    ? new Date(r.expiresAt).toLocaleString()
                    : "Never"}
                </TableCell>
                <TableCell align="right">{r.clicks?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}