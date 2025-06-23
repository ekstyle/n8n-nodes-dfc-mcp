import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class DeleteMemberOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Delete Member',
        value: 'deleteMember',
        description: 'Delete a member by ID',
        action: 'Delete a member',
        routing: {
            request: {
                method: 'DELETE',
                url: '=/members/{{$parameter["memberId"]}}',
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Member ID',
            name: 'memberId',
            type: 'string',
            default: '',
            required: true,
            description: 'Unique identifier of the member',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['deleteMember'],
                },
            },
        },
    ];
}
