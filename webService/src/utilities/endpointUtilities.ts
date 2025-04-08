import { Response} from 'express';
export async function endpointWrapper(func: () => any, res: Response) {
  try {
    const result = await func();
    res.status(200).send(result);
  } catch (err) {
    console.error("Error during endpoint execution:", err);
    res.status(err.status || 500).send({ error: err.message });
  }
}
