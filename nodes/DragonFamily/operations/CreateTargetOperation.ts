import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class CreateTargetOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Create Target',
        value: 'createTarget',
        description: 'Create a new target for a child',
        action: 'Create a target',
        routing: {
            request: {
                method: 'POST',
                url: '/v2/targets/',
                body: {
                    image: null,
                    name: '={{$parameter["name"]}}',
                    participants: [
                        {
                            profile: '={{$parameter["childId"]}}',
                            total: '={{$parameter["price"]}}',
                            total_local_currency: 0,
                        },
                    ],
                    target_template_id: '={{$parameter["targetTemplateId"]}}',
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Target Name',
            name: 'name',
            type: 'string',
            default: '',
            required: true,
            description: 'Name of the target',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createTarget'],
                },
            },
        },
        {
            displayName: 'Child ID',
            name: 'childId',
            type: 'string',
            default: '',
            required: true,
            description: 'ID of the child profile',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createTarget'],
                },
            },
        },
        {
            displayName: 'Price',
            name: 'price',
            type: 'number',
            default: 0,
            required: true,
            description: 'Target price/amount',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createTarget'],
                },
            },
        },
        {
            displayName: 'Target Template ID',
            name: 'targetTemplateId',
            type: 'string',
            default: '',
            required: true,
            description: 'ID of the target template',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createTarget'],
                },
            },
        },
    ];
} 