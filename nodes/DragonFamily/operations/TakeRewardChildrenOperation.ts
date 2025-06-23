import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class TakeRewardChildrenOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Take Reward Children',
        value: 'takeRewardChildren',
        description: 'Give a reward to a child',
        action: 'Give a reward',
        routing: {
            request: {
                method: 'POST',
                url: '/stimulation',
                body: {
                    child: '={{$parameter["childId"]}}',
                    amount: '={{$parameter["amount"]}}',
                    comment: 'ai',
										kind: 'prize',
										date_time: new Date().toISOString(),
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Child ID',
            name: 'childId',
            type: 'number',
            default: '',
            required: true,
            description: 'Unique identifier of the child',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['takeRewardChildren'],
                },
            },
        },
        {
            displayName: 'Amount',
            name: 'amount',
            type: 'number',
            default: '',
            required: true,
            description: 'Reward amount',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['takeRewardChildren'],
                },
            },
        },
    ];
}
