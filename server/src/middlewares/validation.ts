import { Request, Response } from "express"
import { validationResult } from "express-validator"

export async function validationMiddleware(req: Request, res: Response): Promise<Request | Response | undefined> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
}
