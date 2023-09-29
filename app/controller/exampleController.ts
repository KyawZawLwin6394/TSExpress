import { Request, Response } from 'express';

export const getGreeting = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ success: true, message: 'Hi There!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
