import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { GetMemberOperation } from './operations/GetMemberOperation';
import { CreateMemberOperation } from './operations/CreateMemberOperation';
import { DeleteMemberOperation } from './operations/DeleteMemberOperation';
import { TakeRewardChildrenOperation } from './operations/TakeRewardChildrenOperation';
import { ListTargetsAvailableOperation } from './operations/ListTargetsAvailableOperation';

export class DragonFamily implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Dragon Family',
        name: 'dragonFamily',
        group: ['transform'],
        version: 1,
        icon: { light: 'file:dragonFamily.svg', dark: 'file:dragonFamily.svg' },
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with the Dragon Family API',
        defaults: {
            name: 'Dragon Family',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        usableAsTool: true,
        requestDefaults: {
            baseURL: '={{$parameter["baseUrl"]}}',
            url: '/',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: '={{$parameter["token"] ? "Bearer " + $parameter["token"] : ""}}',
            },
        },
        properties: [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://api.dragonfamily.com',
                description: 'Base URL for the Dragon Family API',
            },
            {
                displayName: 'User Token',
                name: 'token',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'Your API access token. Will be sent as Bearer in Authorization header.',
            },
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Member',
                        value: 'member',
                    },
                ],
                default: 'member',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['member'],
                    },
                },
                options: [
                    GetMemberOperation.option,
                    CreateMemberOperation.option,
                    DeleteMemberOperation.option,
                    TakeRewardChildrenOperation.option,
                    ListTargetsAvailableOperation.option,
                ],
                default: 'getMember',
            },
            ...GetMemberOperation.fields,
            ...CreateMemberOperation.fields,
            ...DeleteMemberOperation.fields,
            ...TakeRewardChildrenOperation.fields,
            ...ListTargetsAvailableOperation.fields,
        ],
    };
}
