import React from 'react';
import '../App.css';
import { CATEGORY_OPTIONS } from '../constants/clothingData';

export class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: CATEGORY_OPTIONS[0].value,
      instruction: '',
      washing: '',
      nextReminder: '',
      showAdvanced: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, category, instruction, washing, nextReminder } = this.state;
    if (!name.trim()) return;

    this.props.onAdd({
      name: name.trim(),
      category,
      instruction: instruction.trim() || undefined,
      washing: washing.trim() || undefined,
      nextReminder,
    });

    this.setState({
      name: '',
      instruction: '',
      washing: '',
      nextReminder: '',
      showAdvanced: false,
    });
  };

  render() {
    const { name, category, instruction, washing, nextReminder, showAdvanced } =
      this.state;

    return (
      <div className="add-task-container">
        <h3>🧥 Добавить новую вещь</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="add-task-input"
            type="text"
            placeholder="Название (например, Шерстяной свитер)"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
            required
            autoFocus
          />

          <select
            className="add-task-select"
            value={category}
            onChange={(e) => this.setState({ category: e.target.value })}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="toggle-advanced"
            onClick={() => this.setState({ showAdvanced: !showAdvanced })}
          >
            {showAdvanced ? '▲ Скрыть настройки' : '▼ Дополнительные настройки'}
          </button>

          {showAdvanced && (
            <div className="advanced-settings">
              <textarea
                className="add-task-textarea"
                placeholder="Инструкция по складыванию (пусто — подставится автоматически)"
                value={instruction}
                onChange={(e) => this.setState({ instruction: e.target.value })}
                rows={3}
              />
              <textarea
                className="add-task-textarea"
                placeholder="Совет по стирке (пусто — подставится автоматически)"
                value={washing}
                onChange={(e) => this.setState({ washing: e.target.value })}
                rows={2}
              />
            </div>
          )}

          <label className="date-label">
            📅 Напомнить об уходе:
            <input
              type="date"
              className="date-input"
              value={nextReminder}
              onChange={(e) => this.setState({ nextReminder: e.target.value })}
            />
          </label>

          <button type="submit" className="add-task-button">
            ✨ Добавить в гардероб
          </button>
        </form>
      </div>
    );
  }
}
