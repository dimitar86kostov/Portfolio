import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError, infer as zInfer } from "zod";

const validate =
  <T extends ZodType>(schema: T) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response<any, Record<string, any>> => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          errors: e.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        errors: [{ field: "server", message: "Internal server error" }],
      });
    }
  };


export default validate;
