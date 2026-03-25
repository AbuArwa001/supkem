import api from "@/lib/api";
import { Application, ApplicationsResponse } from "./types";

export const fetchApplications = (url: string): Promise<Application[]> => 
  api.get(url).then((res) => {
    const data = res.data as ApplicationsResponse | Application[];
    return Array.isArray(data) ? data : data.results || [];
  });
