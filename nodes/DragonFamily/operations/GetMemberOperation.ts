import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class GetMemberOperation {
    /**
     * Option entry for the "Operation" dropdown.
     */
    public static readonly option: INodePropertyOptions = {
        name: 'Get Member',
        value: 'getMember',
        description: 'Retrieve a member by ID',
        action: 'Get a member',
        routing: {
            request: {
                method: 'GET',
                url: '/family/members/',
            },
            output: {
                postReceive: [
                    async function (this, items) {
                        return items.map((item) => ({
                            json: {
                                responseString: JSON.stringify(item.json),
                            },
                        }));
                    },
                ],
            },
        },
    };

    /**
     * Additional fields displayed when this operation is selected.
     */
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
                    operation: ['getMember'],
                },
            },
        },
    ];
}
