import app from "../app";

import environment from "./environment";

app.listen(environment.PORT, () => {
    console.log(`Application listening on port ${environment.PORT}`);
})