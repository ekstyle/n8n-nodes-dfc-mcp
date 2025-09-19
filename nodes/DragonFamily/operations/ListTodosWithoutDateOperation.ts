import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class ListTodosWithoutDateOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'List Todos Without Date',
        value: 'listTodosWithoutDate',
        description: 'Todos without date for a child',
        action: 'List todos without date',
        routing: {
            request: {
                method: 'GET',
                url: '/scheduler/v3/todos/without_date/',
                qs: {
                    assignee: '={{$parameter["assignee"]}}',
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
                    operation: ['listTodosWithoutDate'],
                },
            },
        },
    ];
}
