
export async function endpointWrapper(func: () => any, res: any) {
  try {
    const result = await func();
    return result;
  } catch (err) {
    console.error("Error during endpoint execution:", err);
    res.status(500).send("Something went wrong");
  }
}
