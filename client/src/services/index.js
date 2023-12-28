import { AppPostService } from "./appPost";
import { AuthService } from "./auth";
import { AppCommentService } from "./appComment";

const url = 'http://localhost:4000';
export const authService = new AuthService(`${url}/auth`)
export const appPostService = new AppPostService(`${url}/app`)
export const appCommentService = new AppCommentService(`${url}/comment`)
