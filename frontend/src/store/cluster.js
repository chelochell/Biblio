import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
const API_URL = "http://localhost:5000/api";
export const useClusterStore = create((set) => ({
  clusters: [],
  clustersLoading: false,
  clustersError: null,

  // Create cluster
  createCluster: async (clusterData) => {
    
    try {
      const response = await axios.post(`${API_URL}/clusters`, clusterData, {
        withCredentials: true,
      });
      const data = response.data;

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Failed to create cluster",
        };
      }

      set((state) => ({ clusters: [...state.clusters, data.data] }));
      return { success: true, message: "Cluster created successfully" };
    } catch (error) {
      console.error("Error creating cluster:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create cluster",
      };
    }
  },

  fetchClusters: async () => {
    try {
      
      const user = useAuthStore.getState().user;
      
      if (!user || !user._id) {
        console.log("No authenticated user found");
        set({ clusters: [], clustersLoading: false });
        return [];
      }

      set({ clustersLoading: true, clustersError: null });

      const response = await axios.get(`${API_URL}/clusters?userId=${user._id}`, {
        withCredentials: true,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch clusters");
      }

      set({ clusters: data.data || [], clustersLoading: false });
      return data.data;
    } catch (error) {
      console.error("Error fetching clusters:", error);
      set({
        clustersError: error.response?.data?.message || error.message,
        clustersLoading: false,
        clusters: [],
      });
      return [];
    }
  },

  getClusterById: async (clusterId) => {
    try {
      const response = await axios.get(`${API_URL}/clusters/${clusterId}`, {
        withCredentials: true,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch cluster");
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error fetching cluster by ID:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },
}));