import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class CreateSingleTodoOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Create Single Todo',
        value: 'createSingleTodo',
        description: 'Create one-time todo for specific date',
        action: 'Create single todo',
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
                    operation: ['createSingleTodo'],
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
                    operation: ['createSingleTodo'],
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
                    operation: ['createSingleTodo'],
                },
            },
        },
        {
            displayName: 'Date',
            name: 'date',
            type: 'string',
            default: '',
            required: true,
            description: 'Task date YYYY-MM-DD (required for single todo)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createSingleTodo'],
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
                    operation: ['createSingleTodo'],
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
                    operation: ['createSingleTodo'],
                },
            },
        },
        {
            displayName: 'Image ID',
            name: 'image',
            type: 'number',
            default: 0,
            description: 'UImage ID (optional)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createSingleTodo'],
                },
            },
        },
    ];
}
