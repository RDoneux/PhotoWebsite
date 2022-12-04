import { NextFunction, Request, Response } from "express";

export const checkAuth =
  (authLevel: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const auth = authLevel.filter((value) =>
      req["access"].privilages.includes(value)
    );
    if (auth.length) {
      next();
    } else {
      res.status(401).send({ data: "Not Authorised" });
    }
  };

export const authLevel = (level: string[]) => level;

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req["access"]) {
    next();
  } else {
    res.status(401).send({ data: "Not Authorised" });
  }
};
