require: slotfilling/slotFilling.sc
  module = sys.zb-common

require: js/getters.js
require: js/reply.js
require: js/actions.js

require: sc/addItem.sc
require: sc/deleteItem.sc
require: sc/doneItem.sc
require: sc/speakItem.sc

patterns:
    $AnyText = $nonEmptyGarbage

theme: /
    state: Start
        q!: $regex</start>
        a: Привет! Я помогу навести порядок в шкафу. Скажите «добавь футболку» или «как сложить свитер».

    state: Fallback
        event!: noMatch
        a: Попробуйте: «добавь футболку», «удали первую», «сложил свитер», «как стирать рубашку».
