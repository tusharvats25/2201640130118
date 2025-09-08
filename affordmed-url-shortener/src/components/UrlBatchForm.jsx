import React from "react";
import {
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { upsert, get } from "../lib/storage";
import { Log } from "../lib/logger";

const DEFAULT_ROWS = 1;

function isValidUrl(u) {
  try {
    const url = new URL(u);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function randomCode(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function UrlBatchForm({ onCreated }) {
  const [rows, setRows] = React.useState(
    Array.from({ length: DEFAULT_ROWS }, () => ({ url: "", ttl: 30, code: "" }))
  );
  const [errors, setErrors] = React.useState({});

  const addRow = () => {
    if (rows.length >= 5) return;
    setRows([...rows, { url: "", ttl: 30, code: "" }]);
  };

  const removeRow = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const update = (idx, key, val) => {
    const next = rows.slice();
    next[idx] = { ...next[idx], [key]: val };
    setRows(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    for (let i = 0; i < rows.length; i++) {
      const { url, ttl, code } = rows[i];
      if (!url || !isValidUrl(url)) newErrors[i] = "Enter a valid URL";
      if (code && get(code)) newErrors[i] = "Shortcode already exists";
      if (ttl !== "" && isNaN(Number(ttl))) newErrors[i] = "Validity must be minutes";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) {
      await Log.warn("component", `validation failed for ${Object.keys(newErrors).length} row(s)`);
      return;
    }

    for (let i = 0; i < rows.length; i++) {
      const { url } = rows[i];
      let { code, ttl } = rows[i];
      let tries = 0;
      if (!code) {
        do {
          code = randomCode();
          tries++;
        } while (get(code) && tries < 5);
      }
      const createdAt = Date.now();
      const expiresAt = ttl === "" ? null : createdAt + Number(ttl || 30) * 60 * 1000;
      upsert(code, { url, createdAt, expiresAt, clicks: [] });
      await Log.info("component", `created ${code} (ttl=${ttl || 30})`);
    }

    setRows([{ url: "", ttl: 30, code: "" }]);
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h6">Shorten up to 5 URLs</Typography>
        {rows.map((row, idx) => (
          <Stack key={idx} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
            <TextField
              fullWidth
              label="Original URL"
              value={row.url}
              onChange={(e) => update(idx, "url", e.target.value)}
              error={!!errors[idx]}
              helperText={errors[idx] || ""}
            />
            <TextField
              label="Validity (minutes)"
              sx={{ width: 180 }}
              placeholder="30"
              value={row.ttl}
              onChange={(e) => update(idx, "ttl", e.target.value)}
            />
            <TextField
              label="Custom shortcode (optional)"
              sx={{ width: 240 }}
              placeholder="e.g. promo2025"
              value={row.code}
              onChange={(e) => update(idx, "code", e.target.value.toLowerCase())}
              inputProps={{ pattern: "[a-z0-9]+" }}
              helperText="lowercase letters and digits only"
            />
            {rows.length > 1 && (
              <IconButton aria-label="remove" onClick={() => removeRow(idx)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        ))}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button onClick={addRow} disabled={rows.length >= 5} variant="outlined">
            Add row
          </Button>
          <Divider flexItem orientation="vertical" />
          <Button type="submit" variant="contained">Create Short Links</Button>
        </Stack>
      </Stack>
    </form>
  );
}