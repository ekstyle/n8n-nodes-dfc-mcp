import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class ListTargetsAvailableOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'List Targets Available',
        value: 'listTargetsAvailable',
        description: 'List available target templates',
        action: 'List available targets',
        routing: {
            request: {
                method: 'GET',
                url: '/target_templates',
            },
        },
    };

    public static readonly fields: INodeProperties[] = [];
}
