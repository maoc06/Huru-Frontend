export default async function executeRequest(apiFunc) {
  const response = await apiFunc();
  return response.data;
}
