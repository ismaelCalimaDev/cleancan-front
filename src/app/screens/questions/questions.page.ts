import { Component, OnInit } from '@angular/core';
import { QuestionService} from "../../services/question.service";
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  public questions
  constructor(
    private questionService: QuestionService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.getCommonQuestions()
  }
  private getCommonQuestions() {
    this.loadingService.presentLoading('Cargando dudas')
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response.questions
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }

}
