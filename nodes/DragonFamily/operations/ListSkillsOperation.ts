import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class ListSkillsOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'List Skills',
        value: 'listSkills',
        description: 'Get static list of available skills with descriptions',
        action: 'List skills',
    };

    public static readonly fields: INodeProperties[] = [];
} 