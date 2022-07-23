import { Injectable } from '@angular/core';
import {Api} from "./api.service";
import {QuestionResponse} from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends Api {

  public getQuestions() {
    return this.get<QuestionResponse>('/common-questions')
  }
}
