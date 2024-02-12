import { Application } from "./my-framework/application";
const PORT = process.env.PORT || 3000;
import { router as userRouter } from "./src/user-router";
import { middleware } from "./my-framework/parse-json";

const app = new Application();

app.use(middleware);
app.addRouter(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
