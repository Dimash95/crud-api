import { Router } from "../my-framework/router";
import { getUser, createUser } from "./user-controller";

export const router = new Router();

router.get("/users", getUser);

router.post("/users", createUser);
