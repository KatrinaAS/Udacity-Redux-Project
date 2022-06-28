import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "./_DATA";
import {Question} from "../features/poll/types";

describe('API tests', ()=> {
    it('saves a valid question correctly', async () => {
        const validQuestion = {
            author: "sarahedo",
            optionOneText: "Have a working test",
            optionTwoText: "Have an easy test",

        }
        const result = await _saveQuestion(validQuestion);
        const after = await _getQuestions();
        expect(after).toHaveProperty(result.id);
        expect(result.author).toBe('sarahedo');
        expect(result).toHaveProperty('timestamp')
        expect(result).toHaveProperty('optionOne')
        expect(result['optionOne'].text).toEqual("Have a working test");

        expect(result).toHaveProperty('optionTwo')
        expect(result['optionTwo'].text).toEqual("Have an easy test");


    });

    it('fails on saving an incorrectly formatted questions', async () => {
        const invalidQuestion = {
            author: "sarahedo",
            optionOne: "Have a non-working test",
            optionTwoText: "Have an easy test",

        }
        await expect(_saveQuestion(invalidQuestion)).rejects
            .toBe('Please provide optionOneText, optionTwoText, and author')
    });

    it('saves an answer correctly', async () => {
        const qid = "vthrdm985a262al8qx3do"
        const authedUser="sarahedo";
        const answer="optionOne";
        await expect(_saveQuestionAnswer({qid, authedUser,answer})).resolves.toBeTruthy();
        const questions = await _getQuestions();
        expect(questions[qid].optionOne.votes).toContain(authedUser);
    });

    it('does not save an invalid answer', async () => {
        const authedUser="sarahedo";
        const answer="optionOne";
        // Slight hack here as typescript prevents the error told to test for
        await expect(_saveQuestionAnswer({ qid: false,authedUser,answer})).rejects.toBe("Please provide authedUser, qid, and answer");
    });

});
