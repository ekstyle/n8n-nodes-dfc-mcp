import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class UpdateDailyTodoOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Update Daily Todo',
        value: 'updateDailyTodo',
        description: 'Update existing daily todo for specific date',
        action: 'Update daily todo',
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Todo ID',
            name: 'todoId',
            type: 'string',
            default: '',
            required: true,
            description: 'ID of the todo to update (e.g., 8446164)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Date',
            name: 'date',
            type: 'string',
            default: '',
            required: true,
            description: 'Date for which to update todo YYYY-MM-DD',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'New title for the todo',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            typeOptions: { rows: 3 },
            description: 'New description for the todo',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Dragons',
            name: 'dragons',
            type: 'number',
            default: 0,
            description: 'New reward amount',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Image ID',
            name: 'image',
            type: 'number',
            default: null,
            description: 'New image ID for the todo',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
        {
            displayName: 'Week Days',
            name: 'weekDays',
            type: 'string',
            default: '',
            placeholder: '0,1,2,3,4,5,6',
            description: 'Update week days (0=Mon, 6=Sun). Leave empty to keep unchanged.',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['updateDailyTodo'],
                },
            },
        },
    ];
}
