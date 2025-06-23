import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class CreateMemberOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Create Member',
        value: 'createMember',
        description: 'Create a new member',
        action: 'Create a member',
        routing: {
            request: {
                method: 'POST',
                url: '/members',
                body: {
                    person: {
                        role: '={{$parameter["role"]}}',
                        name: '={{$parameter["name"]}}',
                    },
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            default: '',
            required: true,
            description: 'Name of the member',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createMember'],
                },
            },
        },
        {
            displayName: 'Role',
            name: 'role',
            type: 'string',
            default: '',
            required: true,
            description: 'Role of the member',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createMember'],
                },
            },
        },
    ];
}
