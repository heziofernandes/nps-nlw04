import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUser = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });
    const detractor = surveysUser.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;
    const promoters = surveysUser.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveysUser.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUser.length;

    const calculateAnswers = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractor,
      promoters,
      passives,
      totalAnswers,
      nps: calculateAnswers,
    });
  }
}

export { NpsController };
