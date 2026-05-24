theme: /

    state: ИнструкцияСкладки
        q!: (~как|~расскажи) (~сложить|~складывать|~складка)
            $AnyText::anyText

        script:
            var item_id = get_id_by_selected_item(get_request($context));
            speakInstruction(item_id, $context);

        a: Сейчас расскажу как сложить

    state: СоветСтирки
        q!: (~как|~расскажи) (~стирать|~стирка|~уход)
            $AnyText::anyText

        script:
            var item_id = get_id_by_selected_item(get_request($context));
            speakWashing(item_id, $context);

        a: Вот совет по стирке
