import api from "../api";

// Get Settings
export const getSettings = () =>
  api.get("/settings/");

// Update Settings
export const updateSettings = (section, data) =>
  api.put(`/settings/${section}/`, data);


// Line Item Presets
export const listPresets = () =>
  api.get("/line-items/");

export const createPreset = (data) =>
  api.post("/line-items/", data);

export const updatePreset = (id, data) =>
  api.put(`/line-items/${id}/`, data);

export const deletePreset = (id) =>
  api.delete(`/line-items/${id}/`);