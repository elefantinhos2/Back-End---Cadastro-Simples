import express from "express"
import "express-async-errors"
import "reflect-metadata"

import handleAppErrorMiddleware from "./middlewares/handleAppErrors.middleware"
import loginRoutes from "./routes/login/login.routes"
import user from "./routes/user/users.routes"
import userContacts from "./routes/user/usersContacts.routes"


const app = express()

app.use(express.json())

app.use("/users", user)
app.use("/contacts", userContacts)
app.use("/login", loginRoutes)

app.use(handleAppErrorMiddleware)

export default app