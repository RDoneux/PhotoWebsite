import { Logger } from "../util/logger";
import * as dbService from "./database.service";

describe("database service", () => {
  it("should do nothing if environmental variables aren't set", () => {
    const process = Logger.process("dbConnection");
    jest.spyOn(process, "task");
    dbService.connectToDatabase([]);
    expect(process.task).toHaveBeenCalledWith(
      "Environmental variables not configured for database connection. Please specify a connection string and database name",
      "ERROR"
    );
  });
});
