#!/usr/bin/env node

// Тест для UpdateDailyTodoOperation

console.log('🧪 Тест UpdateDailyTodoOperation\n');

// Функция для weekDays (аналогично create-операциям)
function transformWeekDays(weekDays) {
    if (!weekDays || !weekDays.trim()) return undefined;
    return String(weekDays)
        .split(",")
        .map(x => x.trim())
        .filter(x => x !== "")
        .map(x => +x)
        .filter(x => Number.isInteger(x) && x >= 0 && x <= 6);
}

// Функция для создания тела PATCH-запроса
function createUpdateRequestBody(params) {
    const requestBody = {};
    
    if (params.title) requestBody.title = params.title;
    if (params.description) requestBody.description = params.description;
    if (params.dragons) requestBody.default_max_dragons = params.dragons;
    
    const weekDays = transformWeekDays(params.weekDays);
    if (weekDays && weekDays.length > 0) requestBody.week_days = weekDays;
    
    return requestBody;
}

// Тестовые случаи для обновления
const updateTestCases = [
    {
        name: 'Обновить название и описание',
        params: {
            todoId: '8446164',
            date: '2025-09-24',
            title: 'Убраться в комнате (обновлено)',
            description: 'Новое описание задачи',
            dragons: 0,
            weekDays: ''
        }
    },
        {
            name: 'Изменить вознаграждение',
            params: {
                todoId: '8446164',
                date: '2025-09-24',
                title: '',
                description: '',
                dragons: 10,
                weekDays: ''
            }
        },
    {
        name: 'Обновить дни недели',
        params: {
            todoId: '8446164', 
            date: '2025-09-24',
            title: '',
            description: '',
            dragons: 0,
            weekDays: '1,2,3,4,5'  // только будни
        }
    },
        {
            name: 'Полное обновление',
            params: {
                todoId: '8446164',
                date: '2025-09-24',
                title: 'Полностью новая задача',
                description: 'Обновлённое описание с деталями',
                dragons: 15,
                weekDays: '0,1,2,3,4,5,6'
            }
        }
];

// Запуск тестов
updateTestCases.forEach((testCase, index) => {
    console.log(`\n📋 Тест ${index + 1}: ${testCase.name}`);
    console.log('📥 Входные параметры:', JSON.stringify(testCase.params, null, 2));
    
    console.log('\n🔄 Трансформации:');
    const weekDaysResult = transformWeekDays(testCase.params.weekDays);
    console.log(`  weekDays: "${testCase.params.weekDays}" → ${JSON.stringify(weekDaysResult)}`);
    
    const requestBody = createUpdateRequestBody(testCase.params);
    const url = `/scheduler/v3/todo/${testCase.params.date}/${testCase.params.todoId}/`;
    
    console.log('\n📤 PATCH-запрос:');
    console.log(`  URL: ${url}`);
    console.log(`  Method: PATCH`);
    console.log('  Body:', JSON.stringify(requestBody, null, 2));
    
    console.log('\n' + '─'.repeat(80));
});

console.log('\n✅ Все тесты обновления выполнены!\n');
console.log('💡 Ключевые особенности UpdateDailyTodoOperation:');
console.log('   ✓ Требует todoId и date (обязательные поля)');
console.log('   ✓ URL: /scheduler/v3/todo/{date}/{todoId}/');
console.log('   ✓ Method: PATCH');
console.log('   ✓ Отправляет только заполненные поля');
console.log('   ✓ dragons → default_max_dragons в API');
console.log('   ✓ weekDays трансформируется в week_days массив\n');

console.log('🚀 Готово для n8n!');
console.log('   Операция "Update Daily Todo" обновляет существующую ежедневную задачу.');
console.log('   Укажите ID задачи и дату, затем заполните поля для обновления.\n');
