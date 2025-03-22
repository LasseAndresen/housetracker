import { Response} from 'express';
export async function endpointWrapper(func: () => any, res: Response) {
  try {
    const result = await func();
    res.status(200).send("Success");
  } catch (err) {
    console.error("Error during endpoint execution:", err);
    res.status(500).send("Something went wrong");
  }
}
