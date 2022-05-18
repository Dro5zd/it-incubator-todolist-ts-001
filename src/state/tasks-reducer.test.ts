import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('2', 'todolistId2'))

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('juice', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('2', TaskStatuses.Completed, 'todolistId2'))

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('3', 'fish', 'todolistId2'))

    expect(endState['todolistId2'][2].title).toBe('fish');
    expect(endState['todolistId1'][2].title).toBe('React');
});

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {


    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});


