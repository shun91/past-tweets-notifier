import { randomlyFetchNotionPages } from "./randomlyFetchNotionPage";

randomlyFetchNotionPages().then((r) => console.log(JSON.stringify(r, null, 2)));
