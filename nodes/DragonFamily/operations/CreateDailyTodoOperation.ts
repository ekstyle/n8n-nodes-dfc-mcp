import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class CreateDailyTodoOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Create Daily Todo',
        value: 'createDailyTodo',
        description: 'Create one-time or recurring (daily/weekly) todo',
        action: 'Create todo',
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Assignees',
            name: 'assignees',
            type: 'string',
            default: '',
            placeholder: '1001,1002',
            description: 'Comma-separated profile IDs (e.g., 1001,1002)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Template ID',
            name: 'todoTemplateId',
            type: 'string',
            default: '',
            description: 'If provided, todo is created from template',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'Required when no template is specified',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Date',
            name: 'date',
            type: 'string',
            default: '',
            description: 'Start date YYYY-MM-DD. Omit for undated todos.',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Week Days',
            name: 'weekDays',
            type: 'string',
            default: '',
            placeholder: '0,1,2,3,4,5,6',
            description: 'Comma-separated days 0-6 (0=Mon, 6=Sun). Example: "0,1,2,3,4,5,6" for daily.',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Dragons',
            name: 'dragons',
            type: 'number',
            default: 0,
            description: 'Reward amount (optional, from template if omitted)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            typeOptions: { rows: 3 },
            description: 'Optional description',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Image ID',
            name: 'image',
            type: 'number',
            default: null,
            description: 'UImage ID (optional)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
    ];
}


