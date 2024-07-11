import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const domain = "https://mern-portfolio-0moh.onrender.com"
const domain = process.env.BACKEND_URL

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state, action) {
      state.skills = [];
      state.error = null;
      state.loading = true;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSkillsFailed(state, action) {
      state.skills = state.skills;
      state.error = action.payload;
      state.loading = false;
    },
    addNewSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null; 
    },
    addNewSkillSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetSkillSlice(state, action) {
      state.error = null;
      state.skills = state.skills;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});


export const getAllSkills = () => async (dispatch) => {

  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const response = await axios.get(
      `${domain}/api/v1/skill/getall`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillsSuccess(response.data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      skillSlice.actions.getAllSkillsFailed(error.response.data.message)
    );
  }
};


export const addNewSkill = (data, user) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      `${domain}/api/v1/skill/add`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data", 'Authorization': `${user.token}`}
      }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};







export const updateSkill = (id, proficiency, user) => async (dispatch) => {

  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const response = await axios.put(
      `${domain}/api/v1/skill/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: { "Authorization": `${user.token}`, "Content-Type": "application/json" },
      }
    );
    dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

export const deleteSkill = (id, user) => async (dispatch) => {

  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const response = await axios.delete(
      `${domain}/api/v1/skill/delete/${id}`,
      {
        withCredentials: true, headers: {
          "Authorization": `${user.token}`
        }
      }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
