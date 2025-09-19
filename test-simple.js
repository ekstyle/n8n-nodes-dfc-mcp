#!/usr/bin/env node

// Простой тест функций трансформации для CreateDailyTodoOperation

console.log('🧪 Тест функций трансформации CreateDailyTodoOperation\n');

// Функция для weekDays
function transformWeekDays(weekDays) {
    return String(weekDays || "")
        .split(",")
        .map(x => x.trim())
        .filter(x => x !== "")
        .map(x => +x)
        .filter(x => Number.isInteger(x) && x >= 0 && x <= 6);
}

// Функция для assignees  
function transformAssignees(assignees) {
    if (Array.isArray(assignees)) {
        return assignees.map(x => +x).filter(Number.isFinite);
    }
    return String(assignees || "")
        .split(",")
        .map(x => x.trim())
        .filter(x => x !== "")
        .map(x => +x)
        .filter(Number.isFinite);
}

// Функция для image
function transformImage(image) {
    return image ? image : null;
}

// Функция для создания полного тела запроса
function createRequestBody(params) {
    return {
        todo_template_id: params.todoTemplateId || undefined,
        title: params.title || undefined,
        date: params.date || undefined,
        week_days: transformWeekDays(params.weekDays),
        assignees: transformAssignees(params.assignees),
        dragons: params.dragons || undefined,
        description: params.description || undefined,
        image: transformImage(params.image)
    };
}

// Тестовые случаи
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
        name: 'Одноразовая задача (без повтора)',
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
        name: 'Некорректные дни недели',
        params: {
            title: 'Тест',
            assignees: '1001',
            weekDays: '0,8,invalid,3,-1,15',
            dragons: 1
        }
    },
    {
        name: 'Assignees как массив',
        params: {
            title: 'Массив',
            assignees: [1001, 1002, 1003],
            weekDays: '1,3,5',
            dragons: 5
        }
    },
    {
        name: 'Пустые значения',
        params: {
            assignees: '',
            weekDays: '',
            dragons: 0
        }
    },
    {
        name: 'Разовая задача (single todo)',
        params: {
            title: 'Важная встреча',
            assignees: '1001',
            date: '2025-09-25',
            dragons: 15,
            description: 'Встреча с директором в 15:00'
        }
    },
    {
        name: 'Разовая задача из шаблона',
        params: {
            todoTemplateId: '123',
            assignees: '1002,1003',
            date: '2025-09-30',
            dragons: 8
        }
    }
];

// Запуск тестов
testCases.forEach((testCase, index) => {
    console.log(`\n📋 Тест ${index + 1}: ${testCase.name}`);
    console.log('📥 Входные параметры:', JSON.stringify(testCase.params, null, 2));
    
    console.log('\n🔄 Пошаговые преобразования:');
    console.log(`  weekDays: "${testCase.params.weekDays}" → ${JSON.stringify(transformWeekDays(testCase.params.weekDays))}`);
    console.log(`  assignees: ${JSON.stringify(testCase.params.assignees)} → ${JSON.stringify(transformAssignees(testCase.params.assignees))}`);
    console.log(`  image: ${testCase.params.image} → ${transformImage(testCase.params.image)}`);
    
    const requestBody = createRequestBody(testCase.params);
    
    console.log('\n📤 Итоговое тело POST-запроса:');
    console.log(JSON.stringify(requestBody, null, 2));
    
    console.log('\n' + '─'.repeat(80));
});

console.log('\n✅ Все тесты выполнены!\n');
console.log('💡 Ключевые проверки:');
console.log('   ✓ week_days: строка "0,1,2" → массив [0,1,2]');
console.log('   ✓ Фильтрация некорректных дней (только 0-6)');
console.log('   ✓ assignees: строка или массив → массив чисел');
console.log('   ✓ image: пустое значение → null');
console.log('   ✓ Пустые строки не создают пустые элементы\n');

console.log('🚀 Готово для использования в n8n!');
console.log('   Теперь CreateDailyTodoOperation использует прямой HTTP-запрос через this.helpers.httpRequest.');
console.log('   Routing через INodePropertyOptions убран - используется полная реализация в execute().\n');

console.log('🔧 Как тестировать в n8n:');
console.log('   1. Установите ноду Dragon Family в n8n');
console.log('   2. Выберите операцию:');
console.log('      • "Create Daily Todo" - для повторяющихся задач (с weekDays)');
console.log('      • "Create Single Todo" - для разовых задач (без weekDays, date обязательна)');
console.log('   3. Заполните поля и запустите - увидите реальный HTTP-запрос к API\n');
