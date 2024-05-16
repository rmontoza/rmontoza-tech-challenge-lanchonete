import { Request, Response } from 'express';

export class HandleError {
    handleError(res: Response, error: any) {
        if (error.name.includes('ValidationError')) {
          res.status(400).json({ message: error.message });
        } else if (error.message.includes('DatabaseError')) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}