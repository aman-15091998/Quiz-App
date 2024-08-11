import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../../App';
import { tagReducer } from '../../features/tagSlice';

const mockStore = configureStore([]);

describe('Welcome Component', () => {
    test('renders Welcome page by default', () => {
        const store = mockStore({
            tagReducer: { tags: ['tag1'] },
            quizReducer: { status: false },
        });
        render(
            <Provider store={store}>
                    <App />
            </Provider>
        );

        expect(screen.getByText(/Welcome to the Quiz App/i)).toBeInTheDocument();
    });

    test('navigates to Quiz page when status is true', () => {
        const store = mockStore({
            tagReducer: { tags: ['tag1'] },
            quizReducer: { status: true },
        });

        render(
            <Provider store={store}>
                    <App />
            </Provider>
        );

        expect(screen.queryByText(/Welcome to the Quiz App/i)).not.toBeInTheDocument();
    });

    test('navigates to Quiz page when "Done!" button is clicked', () => {
        const store = mockStore({
            tagReducer: { tags: ['tag1'] },
            quizReducer: { status: false, currentQuestion: {
                "question": "Which of the following is a JavaScript library for building user interfaces?",
                "options": ["React", "Vue.js", "Angular", "Svelte"],
                "correct": ["React"],
                "type": "single",
                "tags": ["Web Development", "SPA"]
              }, questionNumber:0, score:0, questionArr:[{
                "question": "Which of the following is a JavaScript library for building user interfaces?",
                "options": ["React", "Vue.js", "Angular", "Svelte"],
                "correct": ["React"],
                "type": "single",
                "tags": ["Web Development", "SPA"]
              }] },
        });

        render(
            <Provider store={store}>
                    <App />
            </Provider>
        );

        const doneButton = screen.getByRole("button");
        fireEvent.click(doneButton);

        expect(screen.queryByText(/Start the Quiz/i)).toBeInTheDocument();
    });
}); 
