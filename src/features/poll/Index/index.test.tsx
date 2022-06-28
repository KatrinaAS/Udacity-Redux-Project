import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../../app/store";
import App from "../../../App";
import React from "react";
import Index from "./index";
import {UserContext, UserProvider} from "../../user/contexts/UserContext";

test('Default view remains same', () => {
    const currentUser = {
        id: 'sarahedo',
            password:'password123',
        name: 'Sarah Edo',
        avatarURL: null,
        answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']

    }
    const view=render(
        <Provider store={store}>
            <UserContext.Provider value={currentUser}>
                <Index />
            </UserContext.Provider>
        </Provider>
    );
    var answered = screen.getByTestId('answered');
    var unanswered = screen.getByTestId('unanswered');
    var answeredBox=screen.getByTestId("answered-box");
    var unansweredBox=screen.getByTestId("unanswered-box");
    expect(unansweredBox).toBeVisible();
    expect(answeredBox).not.toBeVisible();
    fireEvent.click(answered);
    expect(answeredBox).toBeVisible();
    expect(unansweredBox).not.toBeVisible();
})
