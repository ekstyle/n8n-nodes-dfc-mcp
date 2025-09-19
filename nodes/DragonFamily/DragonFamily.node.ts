import type { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { TakeRewardChildrenOperation } from './operations/TakeRewardChildrenOperation';
import { ListTargetsAvailableOperation } from './operations/ListTargetsAvailableOperation';
import { CreateTargetOperation } from './operations/CreateTargetOperation';
import { ListTasksAvailableOperation } from './operations/ListTasksAvailableOperation';
import { ListTodosOperation } from './operations/ListTodosOperation';
import { ListTodosWithoutDateOperation } from './operations/ListTodosWithoutDateOperation';
import { ListSkillsOperation } from './operations/ListSkillsOperation';
import { CreateDailyTodoOperation } from './operations/CreateDailyTodoOperation';
import { CreateSingleTodoOperation } from './operations/CreateSingleTodoOperation';

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
                    // GetMemberOperation.option,
                    // CreateMemberOperation.option,
                    // DeleteMemberOperation.option,
                    TakeRewardChildrenOperation.option,
                    ListTargetsAvailableOperation.option,
                    CreateTargetOperation.option,
                    ListTasksAvailableOperation.option,
                    ListTodosOperation.option,
                    ListTodosWithoutDateOperation.option,
                    ListSkillsOperation.option,
                    CreateDailyTodoOperation.option,
                    CreateSingleTodoOperation.option,
                ],
                default: '',
            },
            // ...GetMemberOperation.fields,
            // ...CreateMemberOperation.fields,
            // ...DeleteMemberOperation.fields,
            ...TakeRewardChildrenOperation.fields,
            ...ListTargetsAvailableOperation.fields,
            ...CreateTargetOperation.fields,
            ...ListTasksAvailableOperation.fields,
            ...ListTodosOperation.fields,
            ...ListTodosWithoutDateOperation.fields,
            ...ListSkillsOperation.fields,
            ...CreateDailyTodoOperation.fields,
            ...CreateSingleTodoOperation.fields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const operation = this.getNodeParameter('operation', 0) as string;

        if (operation === 'listSkills') {
            const skillsData = {
                relationships_building: 'Relationship building is the ability to connect with others, listen and understand them, express thoughts and feelings, resolve conflicts, and find compromises.',
                self_reliance: 'Self-reliance is the ability to make decisions, set goals independently, solve your own problems, and take responsibility for your freedom of choice.',
                sense_of_purpose: 'Sense of purpose is the ability to stay focused on set goals, overcome obstacles, and keep going despite difficulties.',
                money_management: 'Money management is the ability to plan expenses, save money, and allocate income effectively.',
                creativity: 'Creativity is the ability to find unconventional solutions, see things differently, and express thoughts and feelings through art.',
                critical_thinking: 'Critical thinking is the ability to analyze information, identify key points, compare and evaluate viewpoints, and make reasoned decisions.',
                lifetime_learning: 'Lifelong learning is the ability and motivation to continuously acquire knowledge and improve existing skills.',
            };

            return [
                [
                    {
                        json: skillsData,
                    },
                ],
            ];
        }

        if (operation === 'createDailyTodo') {
            const baseUrl = this.getNodeParameter('baseUrl', 0) as string;
            const token = this.getNodeParameter('token', 0) as string;
            
            // Get parameters
            const todoTemplateId = this.getNodeParameter('todoTemplateId', 0) as string;
            const title = this.getNodeParameter('title', 0) as string;
            const date = this.getNodeParameter('date', 0) as string;
            const weekDaysRaw = this.getNodeParameter('weekDays', 0) as string;
            const assigneesRaw = this.getNodeParameter('assignees', 0) as string;
            const dragons = this.getNodeParameter('dragons', 0) as number;
            const description = this.getNodeParameter('description', 0) as string;
            const image = this.getNodeParameter('image', 0) as number;

            // Transform weekDays
            const weekDays = String(weekDaysRaw || "")
                .split(",")
                .map(x => x.trim())
                .filter(x => x !== "")
                .map(x => +x)
                .filter(x => Number.isInteger(x) && x >= 0 && x <= 6);

            // Transform assignees  
            const assignees = String(assigneesRaw || "")
                .split(",")
                .map(x => x.trim())
                .filter(x => x !== "")
                .map(x => +x)
                .filter(Number.isFinite);

            // Build request body
            const requestBody: any = {};
            if (todoTemplateId) requestBody.todo_template_id = todoTemplateId;
            if (title) requestBody.title = title;
            if (date) requestBody.date = date;
            if (weekDays.length > 0) requestBody.week_days = weekDays;
            if (assignees.length > 0) requestBody.assignees = assignees;
            if (dragons) requestBody.dragons = dragons;
            if (description) requestBody.description = description;
            if (image) requestBody.image = image;
            else requestBody.image = null;

            // Make HTTP request
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/scheduler/v3/todo/create/`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: requestBody,
                json: true,
            });

            return [[{ json: response }]];
        }

        if (operation === 'createSingleTodo') {
            const baseUrl = this.getNodeParameter('baseUrl', 0) as string;
            const token = this.getNodeParameter('token', 0) as string;
            
            // Get parameters
            const todoTemplateId = this.getNodeParameter('todoTemplateId', 0) as string;
            const title = this.getNodeParameter('title', 0) as string;
            const date = this.getNodeParameter('date', 0) as string;
            const assigneesRaw = this.getNodeParameter('assignees', 0) as string;
            const dragons = this.getNodeParameter('dragons', 0) as number;
            const description = this.getNodeParameter('description', 0) as string;
            const image = this.getNodeParameter('image', 0) as number;

            // Transform assignees  
            const assignees = String(assigneesRaw || "")
                .split(",")
                .map(x => x.trim())
                .filter(x => x !== "")
                .map(x => +x)
                .filter(Number.isFinite);

            // Build request body (no week_days for single todo)
            const requestBody: any = {};
            if (todoTemplateId) requestBody.todo_template_id = todoTemplateId;
            if (title) requestBody.title = title;
            if (date) requestBody.date = date; // Required for single todo
            if (assignees.length > 0) requestBody.assignees = assignees;
            if (dragons) requestBody.dragons = dragons;
            if (description) requestBody.description = description;
            if (image) requestBody.image = image;
            else requestBody.image = null;

            // Make HTTP request
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/scheduler/v3/todo/create/`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: requestBody,
                json: true,
            });

            return [[{ json: response }]];
        }

        // For other operations, return empty array (handled by routing)
        return [];
    }
}
