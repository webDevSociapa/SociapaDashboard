"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const FbInstaData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const availableMetrics = ["9AM Foods", "Nutrela", "Alishaan", "9AM Foods"]; // Example metrics

  const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your access token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v21.0/act_3710224139242048/insights?access_token=${accessToken}`
        );
        console.log("response", response);
        setData(response.data.data || []); // Adjust based on actual API response structure
      } catch (err) {
        setError("Failed to fetch data. Please check your credentials.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMetrics(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        background: "#F8F9FA",
        padding: "20px",
        marginTop: "100px",
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 500, color: "#333", marginBottom: "10px" }}
      >
        Profile Performance
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#666", marginBottom: "15px" }}
      >
        Activity from Nov 1, 2024 - Dec 25, 2024
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      {/* {error && <Typography color="error">{error}</Typography>} */}

      {/* Dropdown with Checkboxes */}
      <FormControl fullWidth>
        <InputLabel id="dropdown-checkbox-label">Select Metrics</InputLabel>
        <Select
          labelId="dropdown-checkbox-label"
          multiple
          value={selectedMetrics}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            background: "#FFFFFF",
            borderRadius: "4px",
          }}
        >
          {availableMetrics.map((metric) => (
            <MenuItem key={metric} value={metric}>
              <Checkbox checked={selectedMetrics.indexOf(metric) > -1} />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {data.length > 0 ? (
        <Box sx={{ marginTop: "20px" }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ marginBottom: "10px" }}>
              <Typography>ID: {item.id}</Typography>
              <Typography>Name: {item.name}</Typography>
              {/* Add more fields as per the data structure */}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ marginTop: "20px" }}>Loading...</Typography>
      )}
    </Box>
  );
};

export default FbInstaData;
