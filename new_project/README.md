# Smart Wardrobe — помощник по складыванию одежды

Canvas App (React) + SmartApp Code (сценарий) для платформы Сбер.

Проект собран по рабочему шаблону [todo-canvas-app](../todo-canvas-app-main/todo-canvas-app-main) с функциональностью гардероба из [Smart_wardrobe](../Smart_wardrobe-main/Smart_wardrobe-main).

## Что исправлено по сравнению с Smart_wardrobe

1. **Интеграция с ассистентом** — классовый `App.jsx` и обработка `event.action`, как в рабочем todo-примере (без ломающих хуков и mock-ассистента).
2. **Сценарий SmartApp Code** — `actions.js` отправляет `add_clothing`, `done_clothing`, `delete_clothing` (раньше вызывались несуществующие `addItem`/`deleteItem`).
3. **Согласованность UI** — кнопки «Складка» и «Стирка» вызывают озвучку через `sendData`, а не через сломанный `useSpeech()` без параметров.

## Настройка (два проекта в Studio)

### 1. SmartApp Code

1. [SmartMarket Studio](https://developers.sber.ru/studio/) → **Code for SmartApp**.
2. Создайте пустой проект.
3. Импортируйте папку `scenario/` (или заархивируйте и загрузите zip).
4. **Редактор** → **Собрать**.
5. **Сборки** → скопируйте **webhook**.

### 2. CanvasApp

1. SmartApp Studio → **CanvasApp**.
2. Название смартапа — то же, что в `.env` (`REACT_APP_SMARTAPP`).
3. **Параметры** → сценарий: **SmartApp Code API**, внешняя ссылка = webhook из шага 1.
4. Скопируйте `.env.sample` в `.env`, укажите токен эмулятора и имя смартапа.

### 3. Запуск React

```bash
cd new_project
npm install --legacy-peer-deps
# или: yarn
npm start
```

Node.js рекомендуется **18.x**. После смены `.env` перезапустите `npm start`.

## Голосовые команды

- «Добавь футболку» / «Положи свитер в гардероб»
- «Удали» + название вещи (через выбор из списка)
- «Сложил свитер» / «Готово» + вещь
- «Как сложить рубашку»
- «Как стирать джинсы»

## Структура

```
new_project/
├── src/                 # React (Canvas App)
│   ├── App.jsx          # ассистент + состояние гардероба
│   ├── components/
│   └── ...
└── scenario/            # SmartApp Code
    └── src/
        ├── js/actions.js
        └── sc/*.sc
```

## Документация

- [Assistant Client](https://github.com/salute-developers/salutejs-client)
- [Canvas App](https://developers.sber.ru/docs/ru/va/canvas/title-page)
- [SmartApp Code](https://developers.sber.ru/docs/ru/va/code/overview)
