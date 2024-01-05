export enum ChatPathsEnum {
  CHAT_SCREEN = "/projects/:projectId/sub-projects/:subProjectId/chats",
}

export const ChatPaths = {
  CHAT_SCREEN: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/chats`,
};
