import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Logger } from "../util/logger";

export const issueToken = async (req: Request, res: Response) => {
  const payload = req.headers?.authorization?.split(" ")[1];

  if (
    !process.env.SIGNATURE ||
    !process.env.TOKEN_USERNAME ||
    !process.env.TOKEN_PASSWORD
  ) {
    res.status(500).send({
      data: "Essential environmental variables have not been set. Please see env.example to set up an valid .env file",
    });
    return;
  }

  if (!payload) {
    res.status(201).send({
      data: createToken(process.env.SIGNATURE, {
        title: "visitor access",
        privilages: ["visitor"],
      }),
    });
    return;
  }

  const [username, password] = Buffer.from(payload, "base64")
    .toString("ascii")
    .split(":");

  const keyTitle = req.body?.title;
  const privilages = req.body?.privilages;
  const expiresIn = req.body?.expiresIn;

  if (!keyTitle || !privilages) {
    res.status(500).send({
      data: "Please provide the following attributes: 'keyTitle', 'privilages'",
    });
    return;
  }

  if (
    (await bcrypt.compare(username, process.env.TOKEN_USERNAME)) &&
    (await bcrypt.compare(password, process.env.TOKEN_PASSWORD))
  ) {
    res.status(201).send({
      data: createToken(
        process.env.SIGNATURE,
        {
          title: keyTitle,
          privilages: privilages,
        },
        expiresIn ?? undefined
      ),
    });
  } else {
    res
      .status(401)
      .send({ data: "Please provide a valid username and password" });
  }
};

export const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers?.authorization || "";
  const [type, token] = header.split(" ");
  if (!process.env.SIGNATURE) {
    res.status(500).send({
      data: "Cannot verify token as no environmental token signature has been provided. Please see .env.example for information on how to setup a valid .env file",
    });
    return;
  }
  if (type === "Bearer") {
    const payload = verify(token, process.env.SIGNATURE);
    if (payload["title"]) {
      req["access"] = payload;
    }
  }
  next();
};

function createToken(
  signature: string,
  content: object,
  exparationInDays?: number
): string {
  return sign(
    content,
    signature,
    exparationInDays
      ? {
          expiresIn: `${exparationInDays}d`,
        }
      : {}
  );
}
