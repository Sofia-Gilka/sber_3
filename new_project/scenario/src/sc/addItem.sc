theme: /

    state: ДобавлениеВещи
        q!: (~добавить|~положить|положи|добавь|закинь|~запиши)
            [~вещь|~одежду|~гардероб]?
            $AnyText::anyText

        random:
            a: Добавлено!
            a: Записала в гардероб!

        script:
            addClothing($parseTree._anyText, $context);
            addSuggestions(["Добавь футболку", "Добавь свитер"], $context);
