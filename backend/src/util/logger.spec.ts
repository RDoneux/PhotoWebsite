import { Logger, LoggerSettings } from "./logger";

describe("logger", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process.stdout, "write").mockImplementation();
    LoggerSettings.set({
      production: false,
      testMode: false,
      ignoreWarningInProduction: false,
      ignoreInfoInProduction: false,
      ignoreSuccessInProduction: true,
      ignoreErrorInProduction: true,
    });
  });

  it("should create", () => {
    expect(Logger).toBeTruthy();
  });

  describe("config", () => {
    it("should respond to global config changes", () => {
      Logger.info("info - test");
      Logger.error("error - test");
      Logger.warning("warning - test");
      Logger.success("success - test");
      expect(process.stdout.write).toHaveBeenCalledTimes(4);

      LoggerSettings.set({
        production: true,
        ignoreWarningInProduction: true,
        ignoreInfoInProduction: true,
        ignoreSuccessInProduction: true,
        ignoreErrorInProduction: true,
      });

      Logger.info("info - test");
      Logger.error("error - test");
      Logger.warning("warning - test");
      Logger.success("success - test");
      expect(process.stdout.write).toHaveBeenCalledTimes(4);
    });
    it("should keep default values if config isn't specified", () => {
      LoggerSettings.set({
        production: true,
      });
      Logger.info("info - test");
      Logger.error("error - test");
      Logger.warning("warning - test");
      Logger.success("success - test");
      expect(process.stdout.write).toHaveBeenCalledTimes(2);
    });
  });

  describe("express", () => {
    it("should log express request correctly", () => {
      jest.spyOn(Logger, "info");
      const req: any = {
        method: jest.fn().mockReturnValue("test-method"),
        url: jest.fn().mockReturnValue("test-url"),
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();
      Logger.express(req, res, next);

      expect(Logger.info).toHaveBeenCalledWith(`${req.method}: \t ${req.url}`);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("info", () => {
    it("should print basic message", () => {
      Logger.info("info - test");
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("info - test")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("[INFO")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("\n")
      );
    });
  });

  describe("warning", () => {
    it("should print basic message", () => {
      Logger.warning("warning - test");
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("warning - test")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("[WARNING")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("\n")
      );
    });
  });

  describe("error", () => {
    it("should print basic message", () => {
      Logger.error("error - test");
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("error - test")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("\n")
      );
    });
  });

  describe("success", () => {
    it("should print basic message", () => {
      Logger.success("success - test");
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("success - test")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("[SUCCESS")
      );
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("\n")
      );
    });
  });

  describe("print", () => {
    it("should print message without a new line", () => {
      Logger.info("info - test", false);
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.not.stringContaining("\n")
      );
    });
    it("should print message with prefix", () => {
      Logger.info("info - test", false, "test-prefix");
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("test-prefix")
      );
    });
    it("should assign specified id", () => {
      Logger.info("info - test", false, undefined, "test-id");
      expect(Logger.lines[Logger.lines.length - 1].id).toBe("test-id");
    });
    it("should save line to memory", () => {
      Logger.info("info - test", true, "test-prefix", "test-id");
      const line = Logger.lines[Logger.lines.length - 1];
      expect(line.message).toContain("info - test");
      expect(line.message).toContain("\n");
      expect(line.message).toContain("test-prefix");
      expect(line.id).toEqual("test-id");
    });
  });

  describe("newLine", () => {
    it("should do nothing if new line is false", () => {
      Logger.newLine(false);
      expect(process.stdout.write).toBeCalledTimes(0);
    });
    it("should do nothing if logger is in test mode", () => {
      LoggerSettings.set({ testMode: true });
      Logger.newLine(true);
      expect(process.stdout.write).toBeCalledTimes(0);
    });
    it("should save new line to memory", () => {
      LoggerSettings.set({ testMode: false });
      Logger.newLine(true);
      const line = Logger.lines[Logger.lines.length - 1];
      expect(line.id).toBeDefined;
      expect(line.message).toBe("\n");
    });
    it("should write new line to console", () => {
      LoggerSettings.set({ testMode: false });
      Logger.newLine();
      expect(process.stdout.write).toBeCalledTimes(1);
      expect(process.stdout.write).toBeCalledWith("\n");
    });
  });

  describe("process", () => {
    it("should return existing process if it exists", () => {
      const testProcess = Logger.process(
        "if-exists-test-process",
        "test-process-title"
      );
      expect(Logger.process("if-exists-test-process")).toEqual(testProcess);
    });
    it("should return new process if it doesn't exist", () => {
      expect(
        Logger.process("not-exists-test-process", "test-process-title")
      ).toBeDefined();
    });
    it("should use default title if it isn't specified", () => {
      const testProcess = Logger.process("default-title-test-process");
      expect(testProcess.id).toEqual("default-title-test-process");
      testProcess.complete();
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining("Starting new process... [SUCCESS]")
      );
    });
  });

  describe("task", () => {
    it("should push incomplete message to memory", () => {
      const process = Logger.process("task-incomplete-test-process");
      process.task("test-task");
      expect(process.messages.length).toBe(2);
      const message = process.messages[process.messages.length - 1];
      expect(message.message).toContain("test-task");
      expect(message.level).toBe("INFO");
      expect(message.prefix).toBe("\t - ");
    });
    it("should push complete message to memory", () => {
      const process = Logger.process("task-complete-test-process");
      process.task("test-task", "SUCCESS");
      expect(process.messages.length).toBe(2);
      const message = process.messages[process.messages.length - 1];
      expect(message.message).toContain("test-task");
      expect(message.level).toBe("SUCCESS");
      expect(message.prefix).toBe("\t - ");
    });
    it("should not complete unless given param to do so", () => {
      const process = Logger.process("no-complete-process");
      jest.spyOn(process, "complete");
      process.task("test-task");
      expect(process.complete).not.toHaveBeenCalled();
      process.task("another-test-task", "ERROR");
      expect(process.complete).toHaveBeenCalled();
    });
  });
});
