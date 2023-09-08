export async function decodeHandler(param) {
  const encodedData = param;
  const decodedData = await JSON.parse(decodeURIComponent(encodedData));
  return decodedData;
}  