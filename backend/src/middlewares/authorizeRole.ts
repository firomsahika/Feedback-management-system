import { Request, Response, NextFunction } from "express";

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: "Access denied. Insufficient role." });
      return;
    }
    next();
  };
};
