import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class ListTodosOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'List Todos',
        value: 'listTodos',
        description: 'List todos with date',
        action: 'List todos with date',
        routing: {
            request: {
                method: 'GET',
                url: '/scheduler/v3/todos/list_for_date/',
                qs: {
                    assignee: '={{$parameter["assignee"]}}',
                    date: '={{$parameter["date"]}}',
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Assignee',
            name: 'assignee',
            type: 'string',
            default: '',
            required: true,
            description: 'ID исполнителя (ребенка)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['listTodos'],
                },
            },
        },
        {
            displayName: 'Date',
            name: 'date',
            type: 'string',
            default: '',
            required: true,
            description: 'Дата для фильтрации задач (YYYY-MM-DD)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['listTodos'],
                },
            },
        },
    ];
} 