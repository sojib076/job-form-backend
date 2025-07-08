import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import router from "./routes";
import notFound from "./middlewares/notFound";
import cors from "cors";

const app: Application= express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
