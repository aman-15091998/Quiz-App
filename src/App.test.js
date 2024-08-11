import { render, screen } from '@testing-library/react';
import App from './App';
import { calculateMarks } from './utils/calculateMarks';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('calculateMarks', () => {
  test('correct single choice answer gives 4 marks', () => {
      const currentQuestion = {
          type: "single",
          correct: ["A"]
      };
      const answers = ["A"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(4);
  });

  test('incorrect single choice answer deducts 2 marks', () => {
      const currentQuestion = {
          type: "single",
          correct: ["A"]
      };
      const answers = ["B"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(-2);
  });

  test('no answer for single choice question gives 0 marks', () => {
      const currentQuestion = {
          type: "single",
          correct: ["A"]
      };
      const answers = [];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(0);
  });

  test('all correct answers for multiple choice question gives 4 marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = ["A", "B"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(4);
  });

  test('partial correct answers for multiple choice question gives partial marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = ["A"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(1);
  });

  test('wrong answer in multiple choice question deducts marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = ["A", "C"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(0); // 1 for A, -1 for C
  });

  test('extra selections in multiple choice question deducts marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = ["A", ,"B", "C"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(1); // 1 for A, 1 for B, -1 for C
  });

  test('all incorrect answers for multiple choice question deducts marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = ["C", "D"];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(-2); // -1 for C, -1 for D
  });

  test('no answer for multiple choice question gives 0 marks', () => {
      const currentQuestion = {
          type: "multiple",
          correct: ["A", "B"]
      };
      const answers = [];

      const result = calculateMarks(currentQuestion, answers);
      expect(result).toBe(0);
  });
});
