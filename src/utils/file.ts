export const formatFileName = (fileName: string) => {
  const fileNameNoSpace = fileName
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
  const LOGGED_IN_USER_ID = localStorage.getItem("USER_ID");
  const timestamp = new Date().getTime();
  return `${LOGGED_IN_USER_ID}${timestamp}${fileNameNoSpace}`.trim();
};
