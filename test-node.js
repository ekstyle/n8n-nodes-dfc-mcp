#!/usr/bin/env node

// Тест для CreateDailyTodoOperation
// Симулирует n8n-выражения и показывает что отправится в API

console.log('🧪 Тест CreateDailyTodoOperation\n');

// Симуляция n8n $parameter
function createParameterMock(params) {
    return {
        $parameter: params
    };
}

// Симуляция n8n-выражения {{ ... }}
function evaluateExpression(expression, context) {
    try {
        // Простые выражения вида ={{$parameter["key"]}}
        const simpleMatch = expression.match(/^\{\{\$parameter\["(.+?)"\]\}\}$/);
        if (simpleMatch) {
            const key = simpleMatch[1];
            return context.$parameter[key];
        }
        
        // Сложные выражения - убираем {{ }} и выполняем как JS
        const code = expression.replace(/^\{\{\s*/, '').replace(/\s*\}\}$/, '');
        
        // Заменяем $parameter на parameter для валидного JS
        const jsCode = code.replace(/\$parameter/g, 'parameter');
        
        const func = new Function('parameter', `return ${jsCode}`);
        return func(context.$parameter);
    } catch (error) {
        console.error(`❌ Ошибка в выражении "${expression}":`, error.message);
        return null;
    }
}

// Тестовые сценарии
const testCases = [
    {
        name: 'Ежедневная задача из шаблона',
        params: {
            todoTemplateId: '42',
            assignees: '1001,1002',
            date: '2025-09-21',
            weekDays: '0,1,2,3,4,5,6',
            dragons: 3,
            description: 'Ежедневно по утрам',
            image: 321
        }
    },
    {
        name: 'Будни без шаблона',
        params: {
            title: 'Учёба',
            assignees: '1001',
            date: '2025-09-22',
            weekDays: '0,1,2,3,4',
            dragons: 5
        }
    },
    {
        name: 'Одноразовая задача',
        params: {
            todoTemplateId: '15',
            assignees: '1003',
            date: '2025-09-25',
            weekDays: '',
            dragons: 10,
            description: 'Разовое задание'
        }
    },
    {
        name: 'Выходные дни',
        params: {
            title: 'Отдых',
            assignees: '1001',
            date: '2025-09-21',
            weekDays: '5,6',
            dragons: 2
        }
    },
    {
        name: 'Пустые параметры',
        params: {
            assignees: '',
            weekDays: '',
            dragons: 0
        }
    }
];

// Выражения из CreateDailyTodoOperation
const expressions = {
    todo_template_id: '={{$parameter["todoTemplateId"]}}',
    title: '={{$parameter["title"]}}',
    date: '={{$parameter["date"]}}',
    week_days: '={{ String($parameter["weekDays"] || "").split(",").map(x => x.trim()).filter(x => x !== "").map(x => +x).filter(x => Number.isInteger(x) && x >= 0 && x <= 6) }}',
    assignees: '={{ Array.isArray($parameter["assignees"]) ? $parameter["assignees"].map(x => +x).filter(Number.isFinite) : String($parameter["assignees"] || "").split(",").map(x => x.trim()).filter(x => x !== "").map(x => +x).filter(Number.isFinite) }}',
    dragons: '={{$parameter["dragons"]}}',
    description: '={{$parameter["description"]}}',
    image: '={{ $parameter["image"] ? $parameter["image"] : null }}'
};

// Запуск тестов
testCases.forEach((testCase, index) => {
    console.log(`\n📋 Тест ${index + 1}: ${testCase.name}`);
    console.log('📥 Входные параметры:', JSON.stringify(testCase.params, null, 2));
    
    const context = createParameterMock(testCase.params);
    const result = {};
    
    console.log('\n🔄 Преобразования:');
    Object.entries(expressions).forEach(([key, expr]) => {
        const value = evaluateExpression(expr, context);
        result[key] = value;
        
        // Показываем только интересные преобразования
        if (key === 'week_days' || key === 'assignees' || key === 'image') {
            console.log(`  ${key}: ${JSON.stringify(testCase.params[key === 'assignees' ? 'assignees' : key === 'week_days' ? 'weekDays' : 'image'])} → ${JSON.stringify(value)}`);
        }
    });
    
    console.log('\n📤 Тело POST-запроса:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n' + '─'.repeat(80));
});

console.log('\n✅ Все тесты выполнены!\n');
console.log('💡 Как использовать результаты:');
console.log('   - week_days должен быть массивом чисел 0-6');
console.log('   - assignees должен быть массивом ID профилей');
console.log('   - image: null если не указано, иначе число');
console.log('   - Пустые строки не попадают в запрос\n');
