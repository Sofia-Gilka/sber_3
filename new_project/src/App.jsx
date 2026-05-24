import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';

import './App.css';
import { TaskList } from './pages/TaskList';
import { ASSISTANT_IGNORED_WORDS } from './constants/clothingData';
import { generateId, getDefaultInstruction, getDefaultWashing } from './utils/helpers';

const STORAGE_KEY = 'closet_items';

const DEMO_ITEM = {
  id: 'demo-1',
  name: 'Футболка',
  category: 'верх',
  instruction: 'Сложите пополам вдоль, затем ещё раз пополам',
  washing: '30°C, деликатный режим. Сушить в расправленном виде.',
  nextReminder: '',
  completed: false,
};

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Не удалось загрузить гардероб из localStorage', e);
  }
  return [DEMO_ITEM];
};

const initializeAssistant = (getState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
      nativePanel: {
        defaultText: 'Говорите!',
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  }
  return createAssistant({ getState });
};

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: loadItems(),
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event) => {
      if (event.type === 'character') {
        return;
      }
      if (event.type === 'insets') {
        return;
      }
      const { action } = event;
      this.dispatchAssistantAction(action);
    });

    this.assistant.on('start', (event) => {
      console.log('assistant.on(start)', event, this.assistant.getInitialData());
    });

    this.assistant.on('command', (event) => {
      console.log('assistant.on(command)', event);
    });

    this.assistant.on('error', (event) => {
      console.log('assistant.on(error)', event);
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.items));
    }
  }

  getStateForAssistant() {
    return {
      item_selector: {
        items: this.state.items.map(({ id, name }, index) => ({
          number: index + 1,
          id,
          title: name,
        })),
        ignored_words: ASSISTANT_IGNORED_WORDS,
      },
    };
  }

  findItemId(action) {
    if (!action) return null;
    if (action.id) return action.id;

    if (action.number != null) {
      const index = parseInt(action.number, 10) - 1;
      if (!Number.isNaN(index) && this.state.items[index]) {
        return this.state.items[index].id;
      }
    }

    const query = (action.name || action.note || '').toLowerCase().trim();
    if (query) {
      const found = this.state.items.find((item) =>
        item.name.toLowerCase().includes(query)
      );
      if (found) return found.id;
    }

    return null;
  }

  dispatchAssistantAction(action) {
    if (!action?.type) return;

    switch (action.type) {
      case 'add_clothing':
        return this.add_clothing(action);
      case 'done_clothing':
        return this.done_clothing(action);
      case 'delete_clothing':
        return this.delete_clothing(action);
      case 'speak_instruction':
        return this.speak_instruction(action);
      case 'speak_washing':
        return this.speak_washing(action);
      case 'set_reminder':
        return this.set_reminder(action);
      default:
        console.warn('Неизвестное действие ассистента:', action);
    }
  }

  add_clothing(action) {
    const name = (action.note || action.name || 'Новая вещь').trim();
    const category = action.category || 'другое';

    this.setState({
      items: [
        ...this.state.items,
        {
          id: action.id || generateId(),
          name,
          category,
          instruction: action.instruction || getDefaultInstruction(category),
          washing: action.washing || getDefaultWashing(category),
          nextReminder: action.nextReminder || '',
          completed: false,
        },
      ],
    });
  }

  done_clothing(action) {
    const id = this.findItemId(action);
    if (!id) return;

    const item = this.state.items.find((entry) => entry.id === id);
    if (!item || item.completed) return;

    this.play_done_message();
    this.setState({
      items: this.state.items.map((entry) =>
        entry.id === id ? { ...entry, completed: true } : entry
      ),
    });
  }

  delete_clothing(action) {
    const id = this.findItemId(action);
    if (!id) return;

    this.setState({
      items: this.state.items.filter((entry) => entry.id !== id),
    });
  }

  set_reminder(action) {
    const id = this.findItemId(action);
    const date = action.date || action.nextReminder;
    if (!id || !date) return;

    this.setState({
      items: this.state.items.map((entry) =>
        entry.id === id ? { ...entry, nextReminder: date } : entry
      ),
    });
  }

  speak_instruction(action) {
    const id = this.findItemId(action);
    const item = this.state.items.find((entry) => entry.id === id);
    if (!item) return;
    this._send_action_value(
      'speak',
      `Как сложить ${item.name}: ${item.instruction}`
    );
  }

  speak_washing(action) {
    const id = this.findItemId(action);
    const item = this.state.items.find((entry) => entry.id === id);
    if (!item) return;
    this._send_action_value(
      'speak',
      `Совет по стирке для ${item.name}: ${item.washing}`
    );
  }

  _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id,
        parameters: { value },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (response) => {
      console.log('sendData response:', response);
      unsubscribe();
    });
  }

  play_done_message() {
    const texts = [
      'Отлично! Вещь убрана.',
      'Готово! Шкаф стал аккуратнее.',
      'Супер! Так держать.',
    ];
    const idx = (Math.random() * texts.length) | 0;
    this._send_action_value('done', texts[idx]);
  }

  render() {
    return (
      <TaskList
        items={this.state.items}
        onAdd={(itemData) => this.add_clothing({ type: 'add_clothing', ...itemData })}
        onDone={(item) => {
          if (!item.completed) {
            this.play_done_message();
          }
          this.setState({
            items: this.state.items.map((entry) =>
              entry.id === item.id
                ? { ...entry, completed: !entry.completed }
                : entry
            ),
          });
        }}
        onDelete={(item) => this.delete_clothing({ type: 'delete_clothing', id: item.id })}
        onUpdateReminder={(id, date) =>
          this.set_reminder({ type: 'set_reminder', id, date })
        }
        onSpeakInstruction={(item) =>
          this.speak_instruction({ type: 'speak_instruction', id: item.id })
        }
        onSpeakWashing={(item) =>
          this.speak_washing({ type: 'speak_washing', id: item.id })
        }
      />
    );
  }
}

export default App;
