import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export class CreateDailyTodoOperation {
    public static readonly option: INodePropertyOptions = {
        name: 'Create Daily Todo',
        value: 'createDailyTodo',
        description: 'Create one-time or recurring (daily/weekly) todo',
        action: 'Create todo',
        routing: {
            request: {
                method: 'POST',
                url: '/scheduler/v3/todo/create/',
                body: {
                    // Either template-based or custom
                    todo_template_id: '={{$parameter["todoTemplateId"]}}',
                    title: '={{$parameter["title"]}}',

                    // Scheduling
                    date: '={{$parameter["date"]}}',
                    week_days: '={{ (() => { const raw=$parameter["weekDays"]; const text=String($parameter["weekDaysText"]||"").toLowerCase(); const toNums=(val)=> Array.isArray(val)? val.map(x=>+x): String(val||"").split(",").map(s=>s.trim()).filter(Boolean).map(x=>+x); const clamp=(arr)=> arr.filter(x=>Number.isInteger(x)&&x>=0&&x<=6); const infer=(t)=>{ if(!t) return []; if(/каждый день|ежеднев/.test(t)) return [0,1,2,3,4,5,6]; if(/будн/.test(t)) return [0,1,2,3,4]; if(/выходн/.test(t)) return [5,6]; const m={"пн":0,"понед":0,"вт":1,"втор":1,"ср":2,"сред":2,"чт":3,"четв":3,"пт":4,"пят":4,"сб":5,"суб":5,"вс":6,"воскр":6}; const found=[]; Object.entries(m).forEach(([k,v])=>{ if(t.includes(k)) found.push(v); }); return Array.from(new Set(found)).sort((a,b)=>a-b); }; const nums=clamp(toNums(raw)); const inf=clamp(infer(text)); return nums.length? nums: inf; })() }}',

                    // Assignees and meta
                    assignees: '={{ Array.isArray($parameter["assignees"]) ? $parameter["assignees"].map(x => +x).filter(Number.isFinite) : String($parameter["assignees"] || "").split(",").map(x => x.trim()).filter(x => x !== "").map(x => +x).filter(Number.isFinite) }}',
                    dragons: '={{$parameter["dragons"]}}',
                    description: '={{$parameter["description"]}}',
                    image: '={{ $parameter["image"] ? $parameter["image"] : null }}',
                },
            },
        },
    };

    public static readonly fields: INodeProperties[] = [
        {
            displayName: 'Assignees',
            name: 'assignees',
            type: 'string',
            default: '',
            placeholder: '1001,1002',
            description: 'Comma-separated profile IDs (e.g., 1001,1002)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Template ID',
            name: 'todoTemplateId',
            type: 'string',
            default: '',
            description: 'If provided, todo is created from template',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'Required when no template is specified',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Date',
            name: 'date',
            type: 'string',
            default: '',
            description: 'Start date YYYY-MM-DD. Omit for undated todos',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Week Days',
            name: 'weekDays',
            type: 'string',
            default: '',
            placeholder: '0,1,2,3,4,5,6',
            description: 'For weekly repeat: 0=Mon..6=Sun. Daily: 0-6',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Week Days (Text)',
            name: 'weekDaysText',
            type: 'string',
            default: '',
            placeholder: 'каждый день | будни | выходные | пн, ср, пт',
            description: 'Естественный язык; AI может заполнить. Будет преобразовано в числа 0–6',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Dragons',
            name: 'dragons',
            type: 'number',
            default: 0,
            description: 'Reward amount (optional, from template if omitted)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            typeOptions: { rows: 3 },
            description: 'Optional description',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
        {
            displayName: 'Image ID',
            name: 'image',
            type: 'number',
            default: 0,
            description: 'UImage ID (optional)',
            displayOptions: {
                show: {
                    resource: ['member'],
                    operation: ['createDailyTodo'],
                },
            },
        },
    ];
}


