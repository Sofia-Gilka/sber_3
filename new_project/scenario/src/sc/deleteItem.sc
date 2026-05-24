theme: /

    state: УдалениеВещи
        q!: (~удалить|удали|~убери)
            $AnyText::anyText

        script:
            var item_id = get_id_by_selected_item(get_request($context));
            deleteClothing(item_id, $context);

        a: Удаляю
