import {UsersState} from "./types";
import {LoadingStates} from "../lib/types";
import {chooseQuestion, logout, setRedirect} from "./userSlice";
import userReducer from './userSlice'

describe('User Reducer', () => {
    const initialState: UsersState = {
        create: {state: LoadingStates.Pending},
        currentUserId: "",
        error: {message: null},
        login: {state: LoadingStates.Pending},
        redirectURL: "",
        state: LoadingStates.Success,
        users: {
            sarahedo: {
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
            },
            tylermcginnis: {
                id: 'tylermcginnis',
                password:'abc321',
                name: 'Tyler McGinnis',
                avatarURL: null,
                answers: {
                    "vthrdm985a262al8qx3do": 'optionOne',
                    "xj352vofupe1dqz9emx13r": 'optionTwo',
                },
                questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
            },
        }

    }
    it("Should log out correctly", ()=> {
        initialState.currentUserId="sarahedo";
        expect(userReducer(initialState,logout()).currentUserId).toEqual("")
    })
    it("Should set redirect", () => {
        expect(userReducer(initialState,setRedirect('/apple')).redirectURL).toEqual('/apple');
        expect(userReducer(initialState,setRedirect('/poppy')).redirectURL).toEqual('/poppy');
    })

    it('Should set question answer', ()=>  {
        initialState.currentUserId="sarahedo";
        expect(userReducer(initialState,chooseQuestion({questionID: 'poppy',choice: 'optionOne'})).users[initialState.currentUserId].answers).toHaveProperty('poppy');
        expect(userReducer(initialState,chooseQuestion({questionID: 'poppy',choice: 'optionOne'})).users[initialState.currentUserId].answers['poppy']).toEqual('optionOne');
    })
})