import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class ListTasksAvailableOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'List Tasks Available',
        value: 'listTasksAvailable',
        description: 'List available task templates',
        action: 'List available tasks',
        routing: {
            request: {
                method: 'GET',
                url: '/scheduler/v3/todos/templates',
                qs: {
                    skill_code: '={{$parameter["skillCode"]}}',
                    assignee: '={{$parameter["childId"]}}',
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Skill Code',
            name: 'skillCode',
            type: 'string',
            default: '',
            required: true,
            description: 'Код навыка для фильтрации задач',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['listTasksAvailable'],
                },
            },
        },
        {
            displayName: 'Child ID',
            name: 'childId',
            type: 'string',
            default: '',
            required: true,
            description: 'ID ребенка (исполнителя)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['listTasksAvailable'],
                },
            },
        },
    ];
} 