import React from "react";
import { Container, Typography, Stack, Paper } from "@mui/material";
import UrlBatchForm from "../components/UrlBatchForm";
import UrlList from "../components/UrlList";
import { list } from "../lib/storage";

export default function Home() {
  const [items, setItems] = React.useState(list());

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          AffordMed URL Shortener
        </Typography>
        <Paper elevation={2} sx={{ p: 3 }}>
          <UrlBatchForm onCreated={() => setItems(list())} />
        </Paper>
        <UrlList items={items} />
      </Stack>
    </Container>
  );
}