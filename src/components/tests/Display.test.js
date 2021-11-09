import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display'

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');


test('render without error', ()=>{
    render(<Display />)
})




test('show component renders when button is pressed', async () => {
    fetchShow.mockResolvedValueOnce({
        name: 'Test Show',
        summary: 'Test summary',
        seasons: [
            {
                id: 1,
                name: 'Season One',
                episodes: []
            },
            {
                id: 2,
                name: 'Season Two',
                episodes: []
            }]
        }
    );


    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    
    const testShow = await screen.findByText(/test show/i);
    expect(testShow).toBeTruthy();
})


test('correct number of season options available in dropdown', async () => {
    fetchShow.mockResolvedValueOnce({
        name: 'Test Show',
        summary: 'Test summary',
        seasons: [
            {
                id: 1,
                name: 'Season One',
                episodes: []
            },
            {
                id: 2,
                name: 'Season Two',
                episodes: []
            }]
        }
    );


    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    
    const selectOptions = await screen.findAllByTestId('season-option');
    expect(selectOptions).toHaveLength(2)
    
})

test('function fires when button is pressed', ()=> {
    const fakeDisplayFunc = jest.fn();

    fetchShow.mockResolvedValueOnce({
        name: 'Test Show',
        summary: 'Test summary',
        seasons: [
            {
                id: 1,
                name: 'Season One',
                episodes: []
            },
            {
                id: 2,
                name: 'Season Two',
                episodes: []
            }]
        }
    );

    render (<Display displayFunc={fakeDisplayFunc} />)

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(fakeDisplayFunc).toHaveBeenCalled()


})

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.