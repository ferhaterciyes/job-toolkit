import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [] /* apiden gelen filtrelenmeyen */,
  jobs: [] /* filtreleme sonucu elde ettiğimizi aktardığımız */,
  isLoading: false,
  isError: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setJobs: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = payload;
      state.mainJobs = payload;
    },
    setError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    createJob: (state, { payload }) => {
      state.jobs.push(payload);
    },
    filterBySearch: (state, { payload }) => {
      const query = payload.text.toLowerCase();

      const filtered = state.mainJobs.filter((job) =>
        job[payload.field].toLowerCase().includes(query),
      );
      state.jobs = filtered;
    },
    sortJobs: (state, { payload }) => {
      switch (payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;

        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));

          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;

        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));

          break;

        default:
          break;
      }
    },
    /* sıfırlama */
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    deleteJobs: (state, { payload }) => {
    
      state.jobs = state.jobs.filter((i) => i.id !== payload);
      state.mainJobs = state.mainJobs.filter((i) => i.id !== payload.id);
    },
  },
});

export const {
  deleteJobs,
  clearFilters,
  setLoading,
  setJobs,
  setError,
  createJob,
  sortJobs,
  filterBySearch,
} = jobsSlice.actions;

export default jobsSlice.reducer;
