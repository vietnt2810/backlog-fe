import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";

const useUpdateReadNotification = () => {
  const { mutateAsync: readNotification } = useMutation({
    mutationFn: (notificationId: string) => {
      return api.put(ProjectsEndpoints.READ_NOTIFICATION(notificationId));
    },
  });

  return {
    readNotification,
  };
};

export default useUpdateReadNotification;
