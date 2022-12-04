import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import moment from "moment";

interface Line {
  id: string | number;
  lineNumber: number;
  message: any;
}
export class Logger {
  private static colours = {
    INFO: 34,
    SUCCESS: 32,
    WARNING: 33,
    ERROR: 31,
  };
  private static activeProcesses: Process[] = [];
  public static lines: Line[] = [];

  /* istanbul ignore next */
  private constructor() {}

  public static express = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`${req.method}: \t ${req.url}`);
    next();
  };

  public static info(
    message: any,
    newLine?: boolean,
    prefix?: any,
    id?: string | number
  ): void {
    if (
      LoggerSettings.get("production") &&
      LoggerSettings.get("ignoreInfoInProduction")
    )
      return;
    this.print(message, "INFO", prefix, newLine, id);
  }

  public static success(
    message: any,
    newLine?: boolean,
    prefix?: any,
    id?: string | number
  ): void {
    if (
      LoggerSettings.get("production") &&
      LoggerSettings.get("ignoreSuccessInProduction")
    )
      return;
    this.print(message, "SUCCESS", prefix, newLine, id);
  }

  public static warning(
    message: any,
    newLine?: boolean,
    prefix?: any,
    id?: string | number
  ): void {
    if (
      LoggerSettings.get("production") &&
      LoggerSettings.get("ignoreWarningInProduction")
    )
      return;
    this.print(message, "WARNING", prefix, newLine, id);
  }

  public static error(
    message: any,
    newLine?: boolean,
    prefix?: any,
    id?: string | number
  ): void {
    if (
      LoggerSettings.get("production") &&
      LoggerSettings.get("ignoreErrorInProduction")
    )
      return;
    this.print(message, "ERROR", prefix, newLine, id);
  }

  public static newLine(newLine: boolean = true) {
    if (!newLine || LoggerSettings.get("testMode")) return;
    this.lines.push({
      id: randomUUID(),
      message: "\n",
      lineNumber: this.lines.length,
    });
    process.stdout.write(this.lines[this.lines.length - 1].message);
  }

  public static process(id: string | number, processTitle?: string): Process {
    const process = this.activeProcesses.find((process) => process.id === id);
    if (process) return process;
    const newProcess: Process = new Process(id);
    newProcess.title(processTitle ?? "Starting new process");
    this.activeProcesses.push(newProcess);
    return newProcess;
  }

  private static print(
    rawMessage: any,
    level: "INFO" | "SUCCESS" | "WARNING" | "ERROR",
    prefix?: any,
    newLine: boolean = true,
    id?: string | number
  ): void {
    if (LoggerSettings.get("testMode")) return;
    this.lines.push({
      id: id ?? randomUUID(),
      lineNumber: this.lines.length,
      message: this.wrapMessageInColour(
        `${prefix ?? ""}[${level} - ${moment(new Date()).format(
          "HH:MM:SSSS"
        )}]: ${rawMessage} ${newLine ? "\n" : ""}`,
        this.colours[level]
      ),
    });
    process.stdout.write(this.lines[this.lines.length - 1].message);
  }

  private static wrapMessageInColour(message: any, colour: number): string {
    return `\x1b[${colour}m${message}\x1b[0m`;
  }

  public static clearProcess(process: Process) {
    this.activeProcesses = this.activeProcesses.filter(
      (filterProcess) => filterProcess.id != process.id
    );
  }
}

export class Process {
  private processTitle: string = "";
  public id: string | number;
  public messages: {
    message: string;
    level: "SUCCESS" | "WARNING" | "ERROR" | "INFO";
    prefix?: string;
  }[] = [];

  constructor(id: string | number) {
    this.id = id;
  }

  public title(title: string) {
    this.processTitle = title;
    this.messages.push({ message: title + "... [PENDING]", level: "INFO" });
  }

  public task(message: any, complete?: "SUCCESS" | "WARNING" | "ERROR") {
    this.messages.push({
      message: message,
      level: complete ?? "INFO",
      prefix: "\t - ",
    });
    if (!complete) return;
    this.complete(complete);
  }

  public complete(state?: "SUCCESS" | "WARNING" | "ERROR" | "INFO") {
    this.messages.forEach((message, index) => {
      this.printTask(
        index === 0
          ? this.processTitle + `... [${state ?? "SUCCESS"}]`
          : message.message,
        index === 0 ? state ?? "SUCCESS" : message.level,
        message.prefix,
        index === 0 ? this.id : randomUUID()
      );
    });
    Logger.newLine();
    Logger.clearProcess(this);
  }

  private printTask(
    message: any,
    state?: "SUCCESS" | "WARNING" | "ERROR" | "INFO",
    prefix?: string,
    id?: string | number
  ) {
    if (!state || state === "SUCCESS")
      Logger.success(message, true, prefix, id);
    if (state === "WARNING") Logger.warning(message, true, prefix, id);
    if (state === "ERROR") Logger.error(message, true, prefix, id);
    if (state === "INFO") Logger.info(message, true, prefix, id);
  }
}

interface DefaultLoggerSettings {
  production: boolean;
  testMode: boolean;
  ignoreWarningInProduction: boolean;
  ignoreInfoInProduction: boolean;
  ignoreSuccessInProduction: boolean;
  ignoreErrorInProduction: boolean;
}

export interface LoggerSettings extends Partial<DefaultLoggerSettings> {}

const defaultLoggerSettings: DefaultLoggerSettings = {
  production: false,
  testMode: process.env.JEST_WORKER_ID !== undefined,
  ignoreWarningInProduction: false,
  ignoreInfoInProduction: false,
  ignoreSuccessInProduction: false,
  ignoreErrorInProduction: true,
};

export class LoggerSettings {
  private static config: LoggerSettings = defaultLoggerSettings;

  public static set(config: LoggerSettings) {
    this.config = { ...this.config, ...config };
  }

  public static get(setting: keyof DefaultLoggerSettings) {
    return this.config[setting];
  }
}
