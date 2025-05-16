// import { Request, Response, NextFunction } from "express";
// import { GeminiService } from "../utils/gemini";

// interface ChatRequest extends Request {
//   body: {
//     question: string;
//   };
// }

// export class ChatbotController {
//   static async ask(
//     req: ChatRequest,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     const { question } = req.body;

//     if (!question) {
//       res.status(400).json({ message: "Question is required" });
//       return;
//     }

//     try {
//       const prompt = `Provide a detailed answer to the following trading-related question: ${question}`;
//       const answer = await GeminiService.generateResponse(prompt);
//       res.status(200).json({ answer });
//     } catch (error) {
//       console.error("Error in ChatbotController:", error);
//       next(error);
//     }
//   }
// }
