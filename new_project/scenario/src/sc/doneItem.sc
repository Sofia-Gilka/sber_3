theme: /

    state: ВыполнениеВещи
        q!: (~выполнил|~сложил|~сделал|готово|~убрал)
            $AnyText::anyText

        random:
            a: Отлично!
            a: Молодец!

        script:
            var item_id = get_id_by_selected_item(get_request($context));
            doneClothing(item_id, $context);
