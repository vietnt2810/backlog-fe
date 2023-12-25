import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { NotificationsResponse } from "../types/project.types";

const useGetNotifications = (projectId: string, userId: string) => {
  const { data: notifications, refetch: refetchNotifications } =
    useQuery<NotificationsResponse>({
      queryKey: ["useGetNotifications", projectId],
      queryFn: () => {
        return api.get(ProjectsEndpoints.NOTIFICATIONS(projectId, userId));
      },
    });

  return {
    notifications,
    refetchNotifications,
  };
};

export default useGetNotifications;
